# coding: utf-8
from random import choice

from engine import error
from engine import states
from engine.states import Stable, Explode, Endboard


class BlockState:
    STABLE = 'stable'
    FALLING = 'falling'
    PRESSURE = 'pressure'
    EXPLODING = 'exploding'


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

    def __str__(self):
        return self.name[0]


BLOCK_TYPES = BlockType.generate_types()


class Block:
    def __init__(self, slots, x, y, type=None, age=0):
        self.slots = slots
        self.x = x
        self.y = y

        self.type = type or choice(BLOCK_TYPES)
        self.strength = self.type.strength

        self.state = Stable(block=self)
        self.age = age

    def tick(self):
        try:
            self.age += 1
            if self.state == "FALLING":
                self.fall()
            elif self.state == "UNPRESSED":
                self.strength = self.type.strength
            elif self.state == "MOREPRESS":
                self.strength -= 1
            next(self.state)
        except Explode:
            self.die()
        except Endboard as e:
            raise e

    def matches(self, block):
        return self.type == block.type

    @property
    def has_left(self):
        return self.x > 0

    @property
    def left(self):
        if self.has_left:
            return self.slots[self.x - 1, self.y]
        else:
            raise states.OutOfBoard()

    @property
    def has_right(self):
        return self.x < self.slots.shape[1]

    @property
    def right(self):
        if self.has_right:
            return self.slots[self.x + 1, self.y]
        else:
            raise states.OutOfBoard()

    @property
    def has_down(self):
        return self.y > 0

    @property
    def down(self):
        if self.has_down:
            return self.slots[self.x, self.y - 1]
        else:
            raise error.OutOfBoard()

    @property
    def has_up(self):
        return self.y < self.slots.shape[0]

    @property
    def is_crushed(self):
        return self.strength == 0

    @property
    def up(self):
        if self.has_up:
            return self.slots[self.x, self.y + 1]
        else:
            raise error.OutOfBoard()

    @property
    def is_floating(self):
        try:
            return self.down is None
        except error.OutOfBoard:
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
        if x < 0 or x > self.slots.shape[1] or y < 0 or y > self.slots.shape[0]:
            raise error.OutOfBoard()

        target_block = self.slots[x, y]
        target_block.x = self.x
        target_block.y = self.y
        self.slots[self.x, self.y] = target_block

        self.x = x
        self.y = y
        self.slots[x, y] = self

    def die(self):
        self.slots[self.x, self.y] = None

    @property
    def combos(self):
        # look horizontal
        combos_w = [self]

        pivot = self
        while pivot.has_left:
            left = pivot.left
            if pivot.matches(left):
                combos_w.append(left)
            else:
                break

        pivot = self
        while pivot.has_right:
            right = pivot.right
            if pivot.matches(right):
                combos_w.append(right)
            else:
                break

        # look vertical
        combos_h = [self]

        pivot = self
        while pivot.has_up:
            up = pivot.up
            if pivot.matches(up):
                combos_h.append(up)
            else:
                break

        pivot = self
        while pivot.has_down:
            down = pivot.down
            if pivot.matches(down):
                combos_h.append(down)
            else:
                break

        all_combos = []
        if len(combos_w) > 2:
            all_combos.extend(combos_w)
        if len(combos_h) > 2:
            all_combos.extend(combos_h)
        return all_combos

    def __str__(self):
        return str(self.type)
