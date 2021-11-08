const Map = require("../../map/Map");

class Room {
  constructor(id, io) {
    this.io = io;
    this.id = id;
    this.players = {};
    this.map = null;
    this.rotation = setInterval(() => this.newMap(), 30000);
  }

  hasPlayer(id) {
    let r = false;
    Object.values(this.players).forEach((v, i) => {
      if (v == id) {
        r = true;
      }
    });
    return true;
  }

  addPlayer(id) {
    if (!this.players[id]) {
      this.players[id] = id;
      if (Object.values(this.players).length === 1) {
        this.newMap();
      }
    }
  }

  removePlayer(id) {
    this.map.removePlayer(id);
    delete this.players[id];
  }

  emit() {
    this.io.in(this.id).emit("event", {
      id: 300,
      roomId: this.id,
      players: [...Object.values(this.players)],
      map: this.map.emit,
    });
  }

  newMap() {
    if (this.map) {
      this.map.stopRuntime();
    }
    this.map = new Map(this.id, this.players, this);
    this.emit();
  }
}

module.exports = Room;
