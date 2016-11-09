# coding: utf-8
from random import choice
import numpy as np


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
    def __init__(self, type=None):
        self.type = type or choice(BLOCK_TYPES)
        self.strength = self.type.strength

    def matches(self, block):
        return self.type == block.type

    def __str__(self):
        return str(self.type)


class Board:
    HEIGHT = 15
    WIDTH = 6

    def __init__(self):
        from tetris.engine import BlockGenerator

        self.generator = BlockGenerator(board=self)

        self.slots = None
        self.growing_slots = None
        self.incoming_slots = None

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
        pass

    def matches(self, x, y):
        pass

    def fill_board(self, height=7):
        possible_heights = [height, height-1, height-2]
        for x in range(0, self.WIDTH):
            for y in range(0, choice(possible_heights)):
                block = self.generator.suggest(1)[0]
                self.slots[x,y] = block
        self.growing_slots = self.generator.suggest_growing()

    def go_up(self):
        slots = np.vstack((self.slots, self.growing_slots))

        self.growing_slots = self.generator.suggest_growing()
        self.slots = slots

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
