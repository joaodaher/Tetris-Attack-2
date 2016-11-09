from tetris.objects import BLOCK_TYPES, Board
import numpy as np


class DTreeSonny:
    def __init__(self, board):
        self.board = board
        self.bitboards = self.generate_bitboards(board)

    @classmethod
    def generate_bitboards(cls, board):
        bitboards = {type: Board.empty() for type in BLOCK_TYPES}

        for y in range(0, board.HEIGHT):
            for x in range(0, board.WIDTH):
                block = board.slots[x, y]
                if block:
                    bitboards[block.type][x, y] = True

        return bitboards

    @classmethod
    def get_combo_locations(cls, bitboard):
        visited_h = np.logical_not(bitboard)
        visited_w = np.logical_not(bitboard)

        width, height = bitboard.shape
        combos = []
        for x in range(0, width-1):
            for y in range(0, height-1):
                matches_h, matches_w = [(x,y)], [(x,y)]

                if not visited_w[x, y]:
                    # travel left
                    for u_x in range(x+1, width):
                        if visited_w[u_x, y]:
                            break
                        else:
                            matches_w.append((u_x, y))
                            visited_w[u_x, y] = True
                if not visited_h[x, y]:
                    # travel up
                    for u_y in range(y+1, height):
                        if visited_h[x, u_y]:
                            break
                        else:
                            matches_h.append((x, u_y))
                            visited_h[x, u_y] = True

                # evaluate matches
                if len(matches_h) > 2:
                    combos.append(matches_h)
                if len(matches_w) > 2:
                    combos.append(matches_w)
        return combos

    @staticmethod
    def bitboard_to_str(bitboard):
        def block_str(b):
            return "x" if b else ""

        return Board.slots_to_str(bitboard, block_str=block_str)

    @property
    def grade(self):
        g = 0.0
        for type, bitboard in self.bitboards.items():
            g += self.bitboard_grade(bitboard=bitboard)
        return g

    def bitboard_grade(self, bitboard):
        combos_n = sum([len(combo) for combo in self.get_combo_locations(bitboard)])
        return combos_n / self.board.slots.size

    def __str__(self):
        output = "\n\nGRADE: {grade:.2f}%".format(grade=self.grade*100)
        for type, board in self.bitboards.items():
            info = "[{type}] {grade:.2f}%".format(
                type=type,
                grade=self.bitboard_grade(bitboard=board)*100)

            board_output = self.bitboard_to_str(board)
            output += "\n\n{info}\n{board}".format(info=info, board=board_output)

        return output


if __name__ == '__main__':
    sonny = DTreeSonny(board=Board())
    print(sonny.board)
    print(sonny)
