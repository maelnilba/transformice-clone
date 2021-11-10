export class Map {
  constructor(roomId, { mapinfos, records, entities }) {
    this.roomId = mapinfos.roomId;
    this.timeEnd = mapinfos.timeEnd;
    this.mices = entities.mices;
    this.grounds = entities.grounds;
    this.mices_object = entities.mices_object;
    this.records = records;
  }
}
