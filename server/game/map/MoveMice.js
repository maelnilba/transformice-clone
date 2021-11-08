class MoveMice {
  constructor() {
    this.roomId = 0;
    this.moveaction = 0;
  }

  get ProtocolId() {
    return 10;
  }

  deserialize(input) {
    this.roomId = input.roomId;
    this.moveaction = input.action;
  }

  action({ socket }, instance) {
    if (instance._rooms[this.roomId]) {
      instance._rooms[this.roomId].map.movePlayer(socket.id, this.moveaction);
    }
  }
}

module.exports = MoveMice;
