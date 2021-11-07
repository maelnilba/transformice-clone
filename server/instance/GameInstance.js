const Room = require("../game/auth/rooms/Room");

class GameInstance {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  get _rooms() {
    return this.rooms;
  }

  hasRoomId(id) {
    if (this.rooms[id]) {
      return true;
    }
    return false;
  }

  addRoom(id) {
    this.rooms[id] = new Room(id, this.io);
  }

  removeRoom(id) {
    delete this.room[id];
  }
}

module.exports = GameInstance;
