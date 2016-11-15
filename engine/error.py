class OutOfBoard(Exception):
    pass


class RoomFullException(Exception):
    pass


class TooFewPlayers(Exception):
    def __init__(self, players, *args, **kwargs):
        self.players = players
        super().__init__(*args, **kwargs)


class WaitingForPlayers(Exception):
    def __init__(self, players, *args, **kwargs):
        self.players = players
        super().__init__(*args, **kwargs)