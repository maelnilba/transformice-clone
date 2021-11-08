const Matter = require("matter-js");
const frameRate = 1000 / 30;
const canvas = { width: 800, height: 400 };

class Map {
  constructor(roomId, players, parent) {
    this.parent = parent;
    this.roomId = roomId;
    this.startX = 200;
    this.startY = 200;
    this.playerlist = players;
    this.mices = players;
    this.engine = Matter.Engine.create();
    this.entities = this.initEntities(this.mices);
    this.runtime = setInterval(() => {
      Matter.Engine.update(this.engine, frameRate);
      this.mices = this.entities.mices.map((m, i) => {
        return m.position;
      });
      this.parent.emit();
    }, frameRate);
  }

  initEntities(mices) {
    let entities = {
      mices: [...Array(Object.values(mices).length)].map((v, i) => {
        return Matter.Bodies.circle(this.startX, this.startY, 20, {
          label: Object.values(this.playerlist)[i],
          friction: 0.3,
        });
      }),
      walls: [
        Matter.Bodies.rectangle(400, 400, 800, 100, {
          isStatic: true,
          friction: 0.3,
        }),
      ],
    };

    Matter.World.add(this.engine.world, [].concat(...Object.values(entities)));

    return entities;
  }

  removePlayer(playerId) {
    delete this.playerlist[playerId];
  }

  movePlayer(playerId, action) {
    if (this.playerlist[playerId]) {
      let mbody = null;
      this.entities.mices.map((m, i) => {
        if (m.label == playerId) {
          mbody = m;
        }
      });
      if (mbody) {
        if (action == "right") {
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(5, mbody.velocity.y)
          );
        } else if (action == "left") {
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(-5, mbody.velocity.y)
          );
        } else if (action == "up") {
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(mbody.velocity.x, -10)
          );
        }
      }
    }
  }
}

module.exports = Map;
