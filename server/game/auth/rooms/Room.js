class Room {
  constructor(id) {
    this.id = id;
    this.player = {};
  }

  addPlayer(id) {
    if (!this.player[id]) {
      this.player[id] = id;
    }
  }
}

module.exports = Room;
