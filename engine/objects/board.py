# coding: utf-8
from random import choice

import numpy as np

from engine import threaded
from engine.objects.blocks import Block


class Board:
    HEIGHT = 15
    WIDTH = 6

    RAISE_TICK_MOD = 10

    def __init__(self, speed=1, auto_fill=True):
        from engine.factory import BlockTypeGenerator

        self.generator = BlockTypeGenerator(board=self)

        self.slots = None
        self.growing_slots = None
        self.incoming_slots = None

        self.powerups = []

        self.ticks = 0
        self.speed = speed

        self.clear_board()
        if auto_fill:
            self.fill_board()

        self.combos = []

        super().__init__()

    @staticmethod
    def empty(t=None):
        if isinstance(t, bool):
            data_type = bool
        else:
            data_type = object

        matrix = np.empty((Board.WIDTH, Board.HEIGHT), dtype=data_type)
        if t is True:
            matrix = np.logical_not(matrix)
        return matrix

    def clear_board(self):
        self.slots = self.empty()
        self.incoming_slots = self.empty()
        self.growing_slots = np.empty(self.HEIGHT, dtype=bool)

    def move_left(self, x, y):
        if x > 0:
            return self.move_right(x=x-1, y=y)
        return False

    def move_right(self, x, y):
        if x >= self.WIDTH:return False

        block = self.slots[x, y]
        if block and block.has_right:
            block.swap_right()
            return True
        elif x < self.WIDTH - 1:
            block = self.slots[x+1, y]
            if block:
                block.swap_left()
                return True
        return False

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

    @threaded
    def _ptick(self, x):
        for y in self.travel_up:
            block = self.slots[x, y]
            if not block: continue
            self.slots[x, y].tick()

        print("[{:.2f}] Ticking".format(x / self.WIDTH * 100))

    def tick(self, concurrent=False):
        self.locate_combos()

        self.ticked = self.empty(False)

        if concurrent:
            for x in self.travel_right:
                self._ptick(x).join()
        else:
            for x in self.travel_right:
                for y in self.travel_up:
                    if self.ticked[x, y]: continue

                    block = self.slots[x, y]
                    if not block: continue
                    ticked = self.slots[x, y].tick()

                    for tx, ty in ticked:
                        self.ticked[tx, ty] = True
                print("[{:.2f}] Ticking".format(x/self.WIDTH*100))

        self.ticks += self.speed
        # if self.ticks % self.RAISE_TICK_MOD == 0:
        #     self.go_up()

    def locate_combos(self):
        self.combos = []

        for x in self.travel_right:
            for y in self.travel_up:
                block = self.slots[x, y]
                if not block or block in self.combos or block.state.name == "FALLING":
                    continue

                # look horizontal
                combos_w = [block]

                for pivot in block.right:
                    if block.matches(pivot) and pivot.state.name != "FALLING":
                        combos_w.append(pivot)
                    else:
                        break

                # look vertical
                combos_h = [block]

                for pivot in block.up:
                    if block.matches(pivot):
                        combos_h.append(pivot)
                    else:
                        break

                if len(combos_w) > 2:
                    self.combos.extend(combos_w)
                if len(combos_h) > 2:
                    self.combos.extend(combos_h)

    def fill_board(self, height=7):
        possible_heights = [height, height-1, height-2]
        for x in range(0, self.WIDTH):
            for y in range(0, choice(possible_heights)):
                type = self.generator.suggest(1)[0]
                block = Block(board=self, x=x, y=y, type=type)
                self.slots[x,y] = block
        self.growing_slots = self.generator.suggest_growing()

    def rain(self, n=1, y=None):
        import random
        if y is None:
            y = self.HEIGHT - 1

        available_x = list(range(0, self.WIDTH))
        random.shuffle(available_x)
        available_x = available_x[:n]
        types = self.generator.suggest(n, self.generator.SUGGEST_MODE.TOP)

        for block_type, x in zip(types, available_x):
            block = Block(board=self, x=x, y=y, type=block_type)
            self.slots[x, y] = block

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

    def plot(self):
        from engine.objects import drawing
        drawing.plot_game(self)


def raining():
    b = Board(auto_fill=False)
    i = 0
    while True:
        if i % 3 == 0:
            b.rain(3, y=10)

        i += 1
        b.plot()
        b.tick(concurrent=True)

if __name__ == '__main__':
    # raining()
    import random
    i = 0
    b = Board()
    while True:
        b.plot()
        b.tick()
        x, y = random.choice(range(0, b.WIDTH-1)), random.choice(range(0, 10))
        b.move_right(x, y)
        i += 1