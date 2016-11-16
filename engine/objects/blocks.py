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
            BlockType('stone', "#967300"),
            BlockType('steel', "#BDBDBD"),
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

        self.state = Stable(block=self, duration=0.0)
        self.age = age

    @property
    def slot_width(self):
        return self.slots.shape[0]

    @property
    def slot_height(self):
        return self.slots.shape[1]

    def swap_left(self):
        self.state = self.state.detour(SwappingLeft)
        if self.state.name == "LSWAPPING":
            block = self.slots[self.x-1, self.y]
            if block:
                block.detour(SwappingRight)
        else:
            print("Unable to swap left")

    def swap_right(self):
        self.state = self.state.detour(SwappingRight)
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
                    self.fall()
                elif self.state.name == "UNPRESSED":
                    self.pressure = MAX_PRESSURE
                elif self.state.name == "MOREPRESS":
                    self.pressure -= 1
                elif self.state.name == "RSWAPPING":
                    x, y = self.x+1, self.y
                    if self.move_to(x, y):
                        ticked.append((x, y))
            self.state = next(self.state)
        except Explode:
            self.die()
        return ticked

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
        if self.is_floating:
            self.move_to(x=self.x, y=self.y - 1)
            return True
        return False

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
    def __init__(self, board, x, y, width=1, height=1, type=None, age=0):
        self.width = width
        self.height = height
        super().__init__(board, x, y, type, age)

    @property
    def x_end(self):
        return self.x + self.width - 1

    @property
    def y_end(self):
        return self.y + self.height - 1

    @property
    def travel_up(self):
        return range(self.y, self.y_end + 1)

    @property
    def travel_down(self):
        return range(self.y_end, self.y - 1, -1)

    @property
    def travel_right(self):
        return range(self.x, self.x_end + 1)

    @property
    def travel_left(self):
        return range(self.x_end, self.x - 1, -1)

    def left(self):
        pivot = self.x
        while pivot > 0:
            pivot -= 1
            for y in self.travel_up:
                yield self.slots[pivot, y]

    @property
    def right(self):
        pivot = self.x_end
        while pivot < self.slot_width - 1:
            pivot += 1
            for y in self.travel_up:
                yield self.slots[pivot, y]

    @property
    def up(self):
        pivot = self.y_end
        while pivot < self.slot_height - 1:
            pivot += 1
            for x in self.travel_right:
                yield self.slots[x, pivot]

    @property
    def down(self):
        pivot = self.y
        while pivot > 0:
            pivot -= 1
            for x in self.travel_right:
                yield self.slots[x, pivot]

    def fall(self):
        if self.is_floating:
            self.move_to(x=self.x, y=self.y - 1)
            return True
        return False

    def move_to(self, x, y):
        for pivot_x in self.travel_right:
            moved = super().move_to(pivot_x, y)
        # FIXME


