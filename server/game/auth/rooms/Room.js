const Map = require("../../map/Map");
const TemplateMap1 = require("../../map/collection/TemplateMap1.json");
const TemplateMap2 = require("../../map/collection/TemplateMap2.json");
const TemplateMap3 = require("../../map/collection/TemplateMap3.json");
const TemplateMap4 = require("../../map/collection/TemplateMap4.json");
const TemplateMap5 = require("../../map/collection/TemplateMap5.json");
const MapList = [
  TemplateMap1,
  TemplateMap2,
  TemplateMap3,
  TemplateMap4,
  TemplateMap5,
];

class Room {
  constructor(id, io) {
    this.io = io;
    this.id = id;
    this.players = {};
    this.map = null;
    this.rotation = setInterval(() => this.newMap(), 120000);
    this.maplist = MapList;
  }

  get playerCount() {
    return [...Object.values(this.players)].length;
  }

  getRandomMap() {
    let rng = Math.floor(Math.random() * this.maplist.length);
    return this.maplist[rng];
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
    this.map = new Map(this.id, this.players, this, this.getRandomMap());
    this.emit();
  }
}

module.exports = Room;
