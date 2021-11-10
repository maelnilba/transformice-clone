const Matter = require("matter-js");
const MapEnums = require("./types/enums/MapEnums");

class Constructor {
  constructor(json) {
    this.world = json.world;
    this.code = json.code;
    this.author = json.author;
  }

  initMap(mices, engine, playerlist) {
    let entities = {
      grounds: [...Object.values(this.world.grounds)].map((ground, i) => {
        return new MapEnums(ground.type, {
          isStatic: !ground.dynamic,
          x: ground.x,
          y: ground.y,
          w: ground.w,
          h: ground.h,
          angle: (ground.angle * Math.PI) / 180,
        }).entity;
      }),
      mices_object: [
        ...this.world.parameters.cheeses,
        ...this.world.parameters.holes,
      ].map((objet, i) => {
        let id = 0;
        if (this.world.parameters.cheeses.includes(objet)) {
          id = 40;
        } else {
          id = 41;
        }
        return new MapEnums(id, { x: objet.x, y: objet.y }).entity;
      }),
      mices: [...Array(Object.values(mices).length)].map((v, i) => {
        return new MapEnums(200, {
          startX: this.world.parameters.mice_start.x,
          startY: this.world.parameters.mice_start.x,
          playerId: Object.values(playerlist)[i].id,
        }).entity;
      }),
    };

    engine.gravity.y = this.world.parameters.gravity;
    Matter.World.add(engine.world, [].concat(...Object.values(entities)));

    return entities;
  }
}

module.exports = Constructor;
