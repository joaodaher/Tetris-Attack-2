# coding: utf-8
from random import choice

from engine import error
from engine.states import Stable, Explode, SwappingRight, SwappingLeft


class BlockType:
    def __init__(self, name, color, skin=None, strength=1, height=1, width=1):
        self.name = name
        self.color = color
        self.strength = strength

        self.height = height
        self.width = width
        self.skin = skin

    @classmethod
    def generate_types(cls):
        return [
            BlockType('triangle', "#32C8FF"),
            BlockType('star', "#F6FF00"),
            BlockType('circle', "#63C400"),
            BlockType('heart', "#FF0000"),
            BlockType('diamond', "#C832FF"),
        ]

    @classmethod
    def hostile_types(cls):
        return [
            BlockType('xstone', "#967300"),
            BlockType('zsteel', "#BDBDBD"),
        ]

    def __str__(self):
        return self.name[0]


BLOCK_TYPES = BlockType.generate_types()
BLOCK_HOSTILE_TYPES = BlockType.hostile_types()

MAX_PRESSURE = 3


class Block:
    def __init__(self, board, x, y, type=None, age=0):
        self.board = board
        self.slots = board.slots
        self.x = x
        self.y = y

        self.type = type or choice(BLOCK_TYPES)
        self.pressure = MAX_PRESSURE
        self.strength = self.type.strength

        self._state = Stable(block=self, duration=0.0)
        self.age = age

    @property
    def slot_width(self):
        return self.slots.shape[0]

    @property
    def slot_height(self):
        return self.slots.shape[1]

    def swap_left(self):
        self._state = self.state.detour(SwappingLeft)
        if self.state.name == "LSWAPPING":
            block = self.slots[self.x-1, self.y]
            if block:
                block.detour(SwappingRight)
        else:
            print("Unable to swap left")

    def swap_right(self):
        self._state = self.state.detour(SwappingRight)
        if self.state.name == "RSWAPPING":
            block = self.slots[self.x + 1, self.y]
            if block:
                state = block.state.detour(SwappingLeft)
                self.slots[self.x + 1, self.y].state = state
        else:
            print("Unable to swap left")

    def tick(self):
        ticked = [(self.x, self.y)]
        try:
            self.age += 1
            if self.state.ready:
                if self.state.name == "FALLING":
                    ticked.extend(self.fall())
                elif self.state.name == "UNPRESSED":
                    self.pressure = MAX_PRESSURE
                elif self.state.name == "MOREPRESS":
                    self.pressure -= 1
                elif self.state.name == "RSWAPPING":
                    x, y = self.x+1, self.y
                    if self.move_to(x, y):
                        ticked.append((x, y))
            self._state = next(self.state)
        except Explode:
            self.die()
        return ticked

    @property
    def state(self):
        return self._state

    @property
    def has_left(self):
        return self.x > 0

    def left(self):
        pivot = self.x
        while pivot > 0:
            pivot -= 1
            yield self.slots[pivot, self.y]

    @property
    def has_right(self):
        return self.x < self.slot_width - 1

    @property
    def right(self):
        pivot = self.x
        while pivot < self.slot_width - 1:
            pivot += 1
            yield self.slots[pivot, self.y]

    @property
    def has_down(self):
        return self.y > 0

    @property
    def down(self):
        pivot = self.y
        while pivot > 0:
            pivot -= 1
            yield self.slots[self.x, pivot]

    @property
    def has_up(self):
        return self.y < self.slot_height - 1

    @property
    def up(self):
        pivot = self.y
        while pivot < self.slot_height - 1:
            pivot += 1
            yield self.slots[self.x, pivot]

    @property
    def is_crushed(self):
        return self.pressure == 0

    @property
    def is_floating(self):
        try:
            return None in self.down
        except StopIteration:
            return False

    def to_fall(self):
        """
        Applies gravity to the block
        :return: Number of slots to fall
        """
        if self.is_floating:
            for y in range(self.y - 1, -1, -1):
                target = self.slots[self.x, y]
                if target:
                    return self.y - y - 1
        return 0

    def fall(self):
        ticked = [(self.x, self.y)]
        if self.is_floating:
            self.move_to(x=self.x, y=self.y - 1)
        return ticked

    def move_to(self, x, y):
        if x < 0 or x >= self.slot_width or y < 0 or y >= self.slot_height:
            raise error.OutOfBoard()

        target_block = self.slots[x, y]
        if target_block:
            target_block.x = self.x
            target_block.y = self.y
            target_block.state = next(target_block.state)
        self.slots[self.x, self.y] = target_block

        self.x = x
        self.y = y
        self.slots[x, y] = self

        return True

    @property
    def is_floating(self):
        if self.y == 0:
            return False
        for block in self.contact_down:
            if block and block.state.name != 'FALLING':
                return False
        return True

    @property
    def contact_down(self):
        pivot = self.y
        while pivot > 0:
            pivot -= 1
            yield self.slots[self.x, pivot]

    def die(self):
        self.slots[self.x, self.y] = None

    @property
    def is_combo(self):
        return self in self.board.combos

    def __str__(self):
        return str(self.type)

    def __repr__(self):
        return "{}[{},{}] | {}".format(self.type, self.x, self.y, self.state)

    def matches(self, other):
        if other:
            return self.type == other.type
        return False

    def __hash__(self):
        return hash((self.x, self.y))


class SuperBlock(Block):
    @classmethod
    def create(cls, board, x, y, width=1, height=1, type=None, age=0):
        blocks = []
        for h in range(y, y + height):
            for w in range(x, x + width):
                blocks.append(SuperBlock(board=board, head=None, next_block=None, x=w, y=h, type=type, age=age))

        for i in range(0, len(blocks)-1):
            block = blocks[i]
            block.head = blocks[0] if i != 0 else None
            block.next_block = blocks[i+1]
            blocks[i] = block

        return blocks

    def __init__(self, board, x, y, head, next_block, type=None, age=0):
        self.head = head
        self.next_block = next_block
        type = type or BLOCK_HOSTILE_TYPES[0]
        super().__init__(board, x, y, type, age)

    @property
    def next(self):
        b = self
        while b.next_block:
            yield b.next_block
            b = b.next_block
        return None

    def left(self):
        if self.head:
            return self.head.left
        else:
            pivot = self.x
            while pivot > 0:
                pivot -= 1
                for y in self.travel_up:
                    yield self.slots[pivot, y]

    @property
    def right(self):
        if self.head:
            return self.head.left
        else:
            pivot = self.travel_right[-1]
            while pivot < self.slot_width - 1:
                pivot += 1
                for y in self.travel_up:
                    yield self.slots[pivot, y]

    @property
    def up(self):
        if self.head:
            return self.head.left
        else:
            pivot = self.y
            while pivot < self.slot_height - 1:
                pivot += 1
                for x in self.travel_right:
                    yield self.slots[x, pivot]

    @property
    def down(self):
        if self.head:
            return self.head.left
        else:
            pivot = self.y
            while pivot > 0:
                pivot -= 1
                for x in self.travel_right:
                    yield self.slots[x, pivot]

    @property
    def travel_right(self):
        all_x = [self.x]
        for block in self.next:
            if block.y != self.y: break
            all_x.append(block.x)
        return all_x

    @property
    def travel_left(self):
        return reversed(self.travel_right)

    @property
    def travel_up(self):
        y = self.y
        yield y
        for block in self.next:
            if block.x != self.x: continue
            y = block.y
            yield y
        yield y+1

    @property
    def travel_down(self):
        return reversed(self.travel_up)

    @property
    def contact_down(self):
        if self.head:
            return self.head.contact_down
        else:
            pivot = self.y
            while pivot > 0:
                pivot -= 1
                for x in self.travel_right:
                    yield self.slots[x, pivot]
                return None

    @property
    def state(self):
        if self.head:
            self._state = self.head._state
        return self._state

    def fall(self):
        if self.head:
            return self.head.fall()
        else:
            ticked = []
            if self.is_floating:
                t = super().fall()  # drop head
                ticked.extend(t)
                for block in self.next:
                    t = super(SuperBlock, block).fall()  # drop siblings
                    ticked.extend(t)
            return ticked

    def __gt__(self, *args, **kwargs):
        return super().__gt__(*args, **kwargs)


