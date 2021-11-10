const Map = require("../../map/Map");

class Room {
  constructor(id, io) {
    this.io = io;
    this.id = id;
    this.players = {};
    this.map = null;
    this.rotation = setInterval(() => this.newMap(), 120000);
  }

  get playerCount() {
    return [...Object.values(this.players)].length;
  }

  stopRotation() {
    if (this.map) {
      this.map.stopRuntime();
    }
    clearInterval(this.rotation);
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

  addPlayer(id, username) {
    if (!this.players[id]) {
      this.players[id] = { id, username };
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

  mapOver() {
    this.stopRotation();
    this.newMap();
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
