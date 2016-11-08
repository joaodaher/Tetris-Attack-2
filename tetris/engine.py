# coding: utf-8
from collections import defaultdict
from random import randrange

from tetris.objects import Block


class BlockGenerator:

    class SUGGEST_MODE:
        FAST = 'fast'
        UNIFORM = 'uniform'
        BOTTOM = 'last_row'
        TOP = 'upper_row'

    def __init__(self, board):
        self.board = board

    def suggest_growing(self):
        return self.suggest(amount=self.board.WIDTH, mode=self.SUGGEST_MODE.BOTTOM)

    def suggest(self, amount=1, mode=None):
        """
        Suggest a new block type
        :param amount: Total of block types to suggest
        :param mode: One of BlockGenerator.SUGEGST_MODE
        :return: A list of blocks
        """
        if mode is None: mode = self.SUGGEST_MODE.FAST

        if mode == self.SUGGEST_MODE.UNIFORM:
            block_generator = self._uniform_block_generator
        elif mode == self.SUGGEST_MODE.TOP:
            block_generator = self._upper_block_generator
        elif mode == self.SUGGEST_MODE.BOTTOM:
            block_generator = self._bottom_block_generator
        else:
            block_generator = Block

        new_blocks = [block_generator() for _ in range(0, amount)]

        return new_blocks

    def type_distribution(self, selected_rows=None):
        """
        Calculate a block type frequency histogram
        :return: Unsorted dict with block_type:frequency
        """
        if not selected_rows:
            selected_rows = range(0, self.board.HEIGHT)

        histogram = defaultdict(int)
        for y in selected_rows:
            for x in range(0, self.board.WIDTH):
                slot = self.board.slots[x][y]
                if slot is None: continue
                histogram[slot.type] += 1
        return histogram

    def block_probability(self, selected_rows=None):
        """
        Calculate a block-type occurrence probability considering:
        Less block, more chances of appearing
        :return: Unsorted dict with block_type:probability
        """
        if not selected_rows:
            selected_rows = range(0, self.board.HEIGHT)

        distribution = self.type_distribution(selected_rows=selected_rows)

        # probability after normalization
        probability = {}
        valid_blocks = sum(distribution.values())
        for type, amount in distribution.items():
            probability[type] = 1 - (float(amount) / valid_blocks)

        return probability

    def _uniform_block_generator(self):
        """
        Generate a block considering a homogeneous distribution
        :return: A block
        """
        probability = self.block_probability()

        # throw the dice
        dice = randrange(0, 100)

        floor = 0
        for type, prob in probability.items():
            ceil = floor + int(prob * 100)
            if dice in range(floor, ceil):
                return Block(type=type)
            floor = ceil

    def _bottom_block_generator(self, n=2):
        """
        Generate block considering N lower rows
        :return: A block
        """
        probability = self.block_probability(selected_rows=range(0, n))

        # throw the dice
        dice = randrange(0, 100)

        floor = 0
        for type, prob in probability.items():
            ceil = floor + int(prob * 100)
            if dice in range(floor, ceil):
                return Block(type=type)
            floor = ceil

    def _upper_block_generator(self):
        """
        Generate a block considering N upper rows
        :return: A block
        """
        pass