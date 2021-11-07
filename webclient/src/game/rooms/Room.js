import { Map } from "../map/Map";

export class Room {
  constructor(id) {
    this.id = id;
    this.players = {};
    this.map = null;
  }

  deserialize(input) {
    this.id = input.roomId;
    this.players = input.players;
    this.map = new Map(input.roomId, input.map.players);
  }

  action(gi) {
    gi.loadRoom(this);
  }
}
