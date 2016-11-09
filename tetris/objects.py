# coding: utf-8
from random import choice
import numpy as np

from tetris import states


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
    def __init__(self, slots, x, y, type=None):
        self.slots = slots
        self.x = x
        self.y = y

        self.type = type or choice(BLOCK_TYPES)
        self.strength = self.type.strength

    def matches(self, block):
        return self.type == block.type

    @property
    def has_left(self):
        return self.x > 0

    @property
    def left(self):
        if self.has_left:
            return self.slots[self.x-1, self.y]
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
            raise states.OutOfBoard()

    @property
    def has_up(self):
        return self.y < self.slots.shape[0]

    @property
    def up(self):
        if self.has_up:
            return self.slots[self.x, self.y + 1]
        else:
            raise states.OutOfBoard()

    @property
    def is_floating(self):
        try:
            return self.down is None
        except states.OutOfBoard:
            return False

    def to_fall(self):
        """
        Applies gravity to the block
        :return: Number of slots to fall
        """
        if self.is_floating:
            for y in range(self.y-1, -1, -1):
                target = self.slots[self.x, y]
                if target:
                    return self.y - y - 1
        return 0

    def fall(self):
        if self.is_floating:
            self.move_to(x=self.x, y=self.y-1)
            return True
        return False

    def move_to(self, x, y):
        if x < 0 or x > self.slots.shape[1] or y < 0 or x > self.slots.shape[0]:
            raise states.OutOfBoard()

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


class Board:
    HEIGHT = 15
    WIDTH = 6

    RAISE_TICK_MOD = 10

    def __init__(self):
        from tetris.engine import BlockTypeGenerator

        self.generator = BlockTypeGenerator(board=self)

        self.slots = None
        self.growing_slots = None
        self.incoming_slots = None

        self.tick = 0

        self.clear_board()
        self.fill_board()

    @staticmethod
    def empty():
        return np.zeros((Board.WIDTH, Board.HEIGHT), dtype=object)

    def clear_board(self):
        self.slots = self.empty()
        self.incoming_slots = self.empty()
        self.growing_slots = np.zeros(self.HEIGHT, dtype=bool)

    def move_left(self, x, y):
        return self.move_right(x=x+1, y=y)

    def move_right(self, x, y):
        block = self.slots[x, y]
        if block:
            block.move_to(x, y + 1)

    @property
    def roof_blocks(self):
        visited = [False] * self.WIDTH
        blocks = [None] * self.WIDTH

        for x in self.travel_right:
            if visited[x]: continue

            for y in self.travel_down:
                block = self.slots[x, y]
                if block:
                    visited[x] = True
                    blocks[x] = block
        return blocks

    def apply_gravity(self):
        changed = []
        for x in self.travel_right:
            for y in self.travel_down:
                block = self.slots[x, y]
                if block:
                    if block.fall():
                        changed.append(block)
        return changed

    def apply_combo(self):
        combos = []
        for x in self.travel_right:
            for y in self.travel_down:
                block = self.slots[x, y]
                if block:
                    combos.append(block.combos)
                    for combo_block in combos:
                        combo_block.die()
        return combos

    def tick(self):
        stable = False
        while not stable:
            stable = True

            changed = self.apply_gravity()
            if changed:
                stable = False
            changed = self.apply_combo()
            if changed:
                stable = False

        if self.tick % self.RAISE_TICK_MOD == 0:
            self.go_up()

        self.tick += 1

    def fill_board(self, height=7):
        possible_heights = [height, height-1, height-2]
        for x in range(0, self.WIDTH):
            for y in range(0, choice(possible_heights)):
                type = self.generator.suggest(1)[0]
                block = Block(slots=self.slots, x=x, y=y, type=type)
                self.slots[x,y] = block
        self.growing_slots = self.generator.suggest_growing()

    def go_up(self):
        slots = np.vstack((self.slots, self.growing_slots))

        self.growing_slots = self.generator.suggest_growing()
        self.slots = slots

    @property
    def travel_down(self):
        return range(self.HEIGHT-1, -1, -1)

    @property
    def travel_up(self):
        return range(0, self.HEIGHT)

    @property
    def travel_right(self):
        return range(0, self.WIDTH)

    @property
    def travel_left(self):
        return range(self.WIDTH-1, -1, -1)

    @property
    def filled_slots(self):
        return np.count_nonzero(self.slots)

    @property
    def empty_slots(self):
        return np.size(self.slots) - self.filled_slots

    def __str__(self):
        def output_row(row):
            return "\n|{}|".format("|".join(row))

        output = ""

        row_output = [" {} ".format(block) if block else "   " for block in self.growing_slots]
        output = output_row(row_output) + output

        row_output = [" - "] * self.WIDTH
        output = output_row(row_output) + output

        for y in range(0, self.HEIGHT):
            row_output = []
            for x in range(0, self.WIDTH):
                block = self.slots[x][y]
                row_output.append(" {} ".format(block) if block else "   ")
            output = output_row(row_output) + output

        return output

    @staticmethod
    def slots_to_str(slots, h=None, w=None, block_str=str):
        def output_row(row):
            return "\n|{}|".format("|".join(row))

        if not h:
            h = slots.shape[1]
        if not w:
            w = slots.shape[0]

        output = ""
        for y in range(0, h):
            row_output = []
            for x in range(0, w):
                block = slots[x, y]
                row_output.append(" {} ".format(block_str(block)) if block else "   ")
            output = output_row(row_output) + output
        return output


class Player:
    pass


class Match:
    pass


if __name__ == "__main__":
    b = Board()
    print(b)
