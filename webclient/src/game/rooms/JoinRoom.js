export class JoinRoom {
  constructor() {
    this.roomId = "";
    this.time = "";
    this.players = {};
  }

  get ProtocolId() {
    return 150;
  }

  deserialize(input) {
    this.roomId = input.roomId;
    this.players = input.players;
  }

  action(gi) {
    // gi.joinRoom(this);
  }
}
