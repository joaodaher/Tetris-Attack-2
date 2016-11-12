# coding: utf-8
from engine.objects.board import Board


class Player:
    def __init__(self, email):
        self.email = email


class Game:
    def __init__(self):
        self.players = {}

    def add_player(self, player):
        self.players[player] = Board()

    def start(self):
        pass


if __name__ == '__main__':
    p1 = Player('joao.daher')

    m = Game()
    m.add_player(p1)