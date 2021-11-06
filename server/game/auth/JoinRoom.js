class JoinRoom {
  constructor() {
    this.roomId = 0;
  }

  deserialize(input) {
    this.roomId = input.roomId;
  }

  action(socket, instance) {
    if (!instance.hasRoomId(this.roomId)) {
      instance.addRoom(this.roomId);
    }
    instance._rooms[this.roomId].addPlayer(socket.id);
    socket.join(this.roomId);
    socket.to(this.roomId).emit("event", {
      id: 200,
      message: "Bonjour",
    });
  }
}

module.exports = JoinRoom;
