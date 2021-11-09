class JoinNewRoom {
  constructor() {
    this.roomId = "";
  }

  deserialize(input) {
    this.roomId = input;
  }
  a;

  action({ socket, username, roomId }, instance) {
    if (this.roomId !== roomId) {
      instance._rooms[roomId].removePlayer(socket.id);
      socket.leave(roomId);
      if (!instance._rooms[roomId].playerCount) {
        instance.removeRoom(roomId);
      }
      if (!instance.hasRoomId(this.roomId)) {
        instance.addRoom(this.roomId);
      }
      instance._rooms[this.roomId].addPlayer(socket.id, username);
      socket.join(this.roomId);
      socket.emit("event", {
        id: 150,
        roomId: this.roomId,
        players: instance._rooms[this.roomId].players,
      });
      instance._rooms[this.roomId].emit();
    }
  }
}

module.exports = JoinNewRoom;
