const Room = require("../game/auth/rooms/Room");

class GameInstance {
  constructor() {
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
    this.rooms[id] = new Room(id);
  }

  removeRoom(id) {
    delete this.room[id];
  }
}

module.exports = GameInstance;
