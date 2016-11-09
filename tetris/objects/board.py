# coding: utf-8
from random import choice

import numpy as np

from tetris.objects import ChronosMixin
from tetris.objects.blocks import Block


class Board(ChronosMixin):
    HEIGHT = 15
    WIDTH = 6

    RAISE_TICK_MOD = 10

    def __init__(self, speed=1):
        from tetris.engine import BlockTypeGenerator

        self.generator = BlockTypeGenerator(board=self)

        self.slots = None
        self.growing_slots = None
        self.incoming_slots = None

        self.powerups = []

        self.ticks = 0
        self.speed = speed

        self.clear_board()
        self.fill_board()

        super().__init__()

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

            self.wait()

        if self.ticks % self.RAISE_TICK_MOD == 0:
            self.go_up()

        self.ticks += self.speed

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
