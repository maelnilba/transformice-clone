class Map {
  constructor(roomId, players) {
    this.roomId = roomId;
    this.players = this.init(players);
  }

  init(players) {
    let nPlayers = {};
    for (let p in players) {
      nPlayers[p] = { id: p, x: 200, y: 200 };
    }
    return nPlayers;
  }

  removePlayer(playerId) {
    delete this.players[playerId];
  }

  movePlayer(playerId, action) {
    if (this.players[playerId]) {
      if (action == "right") {
        this.players[playerId].x = this.players[playerId].x + 5;
      } else if (action == "left") {
        this.players[playerId].x = this.players[playerId].x - 5;
      } else if (action == "up") {
        this.players[playerId].y = this.players[playerId].y - 5;
      } else if (action == "down") {
        this.players[playerId].y = this.players[playerId].y + 5;
      }
    }
  }
}

module.exports = Map;
