const Map = require("../../map/Map");

class Room {
  constructor(id, io) {
    this.io = io;
    this.id = id;
    this.players = {};
    this.map = new Map(this.id, this.players);
    this.rotation = setInterval(() => this.newMap(), 15000);
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
      players: this.players,
      map: { roomId: this.map.id, players: this.map.players },
    });
  }

  newMap() {
    this.map = new Map(this.id, this.players);
    this.emit();
  }
}

module.exports = Room;
