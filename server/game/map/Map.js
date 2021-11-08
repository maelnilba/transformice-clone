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
    this.mices = this.initMices(players);
    this.engine = Matter.Engine.create();
    this.entities = this.initEntities(this.mices);
    this.runtime = setInterval(() => {
      Matter.Engine.update(this.engine, frameRate);
      this.entities.mices.map((m, i) => {
        this.mices[m.label].pos = m.position;
      });
      this.parent.emit();
    }, frameRate);
    Matter.Events.on(this.engine, "collisionStart", (p) => {
      p.pairs.forEach((pair) => {
        if (this.mices[pair.bodyA.label]) {
          this.mices[pair.bodyA.label].isJumped = false;
        }
        if (this.mices[pair.bodyB.label]) {
          this.mices[pair.bodyB.label].isJumped = false;
        }
      });
    });
  }

  initMices(players) {
    let mices = {};
    Object.values(players).map((p, i) => {
      mices[p] = {
        pos: { x: 0, y: 0 },
        isJumped: false,
        isAlive: true,
        hasCheese: false,
        isShaman: false,
      };
    });
    return mices;
  }

  stopRuntime() {
    clearInterval(this.runtime);
  }

  initEntities(mices) {
    let entities = {
      mices: [...Array(Object.values(mices).length)].map((v, i) => {
        return Matter.Bodies.circle(this.startX, this.startY, 20, {
          label: Object.values(this.playerlist)[i],
          friction: 0.3,
          inertia: Infinity,
          collisionFilter: {
            group: -1,
          },
        });
      }),
      walls: [
        Matter.Bodies.rectangle(400, 400, 800, 100, {
          isStatic: true,
          friction: 0.3,
          frictionStatic: 0.3,
        }),
      ],
    };

    this.engine.gravity.y = 1;
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
          Matter.Body.translate(mbody, Matter.Vector.create(5, 0));
        } else if (action == "left") {
          Matter.Body.translate(mbody, Matter.Vector.create(-5, 0));
        } else if (action == "up" && !this.mices[playerId]["isJumped"]) {
          this.mices[playerId]["isJumped"] = true;
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
