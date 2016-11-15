import time
from flask import Flask, render_template
from flask_socketio import Namespace, SocketIO, emit
from flask_socketio import join_room, leave_room

from engine import error
from engine.game.room import Room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

ROOMS = {}


@app.route('/')
def index():
    return render_template('index.html')


class RoomNamespace(Namespace):
    def on_connect(self):
        pass

    def on_disconnect(self):
        pass

    def on_create(self, data):
        room = Room(**data)
        ROOMS[room.id] = room
        join_room(room.id)

        emit("status", "all ok")

        self.room_status(room=room)

    def on_join(self, data):
        uid = data['uid']
        user = data['user']
        spectator = data['spectator']

        if uid in ROOMS:
            room = ROOMS[uid]
            try:
                room.join(user, spectator=spectator)
                join_room(uid)
                self.room_status(room=room)
            except error.RoomFullException:
                emit('status', {'error': "Room is full"})
        else:
            emit('status', {'error': "Room unavailable"})

    def on_ready(self, data):
        player = data['player']
        room_id = data['room_id']
        room = ROOMS[room_id]

        room.change_ready(player=player)

        self.room_status(room=room)

    def room_status(self, room):
        data = {
            'id': room.id,
            'players': room.boards.keys()
        }
        emit('status', data, room=room.id)


class GameNamespace(Namespace):
    def on_board(self):
        pass

    def on_status(self, data):
        """
        Start, pause, endgame
        :param data:
        :return:
        """
        room_id = data['room_id']
        room = ROOMS[room_id]
        if data == 'start':
            self.action_start(room=room)

            while True:
                room.start()
                emit('status', room.boards, room=room.id)
                time.sleep(5)

    def on_move(self, data):
        pass

    def on_swap(self, data):
        pass

    def on_powerup(self, data):
        pass

    def action_start(self, room):
        try:
            room.warm_up()
            info = {
                'status': 'starting'
            }
        except error.WaitingForPlayers as e:
            info = {
                'not_ready': e.players
            }
        except error.TooFewPlayers as e:
            info = {
                'players_n': 1
            }
        emit('status', info, room=room.id)


socketio.on_namespace(RoomNamespace('/room'))
socketio.on_namespace(RoomNamespace('/game'))

if __name__ == '__main__':
    socketio.run(app)
