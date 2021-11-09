const Room = require("../game/auth/rooms/Room");

class GameInstance {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  get _rooms() {
    return this.rooms;
  }

  get _io() {
    return this.io;
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
    this.rooms[id].stopRotation();
    delete this.rooms[id];
  }
}

module.exports = GameInstance;
