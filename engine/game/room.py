# coding: utf-8
import uuid

from engine import error
from engine.objects.board import Board

MAX_PLAYERS = 4  # max player per room
ROUND_DELAY = 2  # seconds between ticks


class Room:
    def __init__(self, private=False, mode=None):
        self.id = uuid.uuid4().hex
        self.boards = {}
        self.spectators = []
        self.ready = {}
        self.mode = mode
        self.private = private

    def join(self, player, spectator=False):
        if spectator:
            self.spectators.append(player)
        elif self.players_n < MAX_PLAYERS:
            self.boards[player] = Board(position=self.players_n+1)
            self.ready[player] = False
        else:
            raise error.RoomFullException()

    def leave(self, player):
        if player in self.spectators:
            self.spectators.remove(player)
        else:
            self.boards.pop(player)
            self.ready.pop(player)

    def change_ready(self, player):
        self.ready[player] = not self.ready[player]

    def round(self):
        self.warm_up()  # verify if ready
        while True:
            for player, board in self.boards:
                board.tick(concurrent=False)
            yield self.boards
            # time.sleep(ROUND_DELAY)

    def warm_up(self):
        if self.players_n < 2:
            raise error.TooFewPlayers(players=self.boards.keys())

        not_ready = []
        for player, is_ready in self.ready.items():
            if not is_ready:
                not_ready.append(player)
        if not_ready:
            raise error.WaitingForPlayers(players=not_ready)

    def start(self):
        for player, board in self.boards:
            board.tick()

    @property
    def players(self):
        return self.boards.keys()

    @property
    def players_n(self):
        return len(self.boards)


if __name__ == '__main__':
    from engine.game.player import Player
    p1 = Player('joao.daher')

    r = Room()
    r.join(p1)
