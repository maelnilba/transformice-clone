export class Map {
  constructor(roomId, entities) {
    this.roomId = roomId;
    this.mices = entities.mices;
    this.grounds = entities.grounds;
    this.mices_object = entities.mices_object;
  }
}
