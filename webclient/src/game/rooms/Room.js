export class Room {
  constructor() {
    this.roomId = "";
    this.time = "";
    this.players = [];
  }

  get ProtocolId() {
    return 150;
  }

  deserialize(input) {
    this.players = input;
  }

  action(gi) {
    gi.joinRoom(this);
  }
}
