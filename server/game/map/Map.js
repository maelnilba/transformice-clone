const Matter = require("matter-js");
const MapEnums = require("./types/enums/MapEnums");
const frameRate = 1000 / 30;
const canvas = { width: 800, height: 400 };

class Map {
  constructor(roomId, players, parent) {
    this.parent = parent;
    this.roomId = roomId;
    this.timeEnd = new Date().setTime(new Date().getTime() + 2 * 60 * 1000);
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
          if (pair.bodyB.label === "Wood") {
            this.mices[pair.bodyA.label].isJumped = false;
          }
          if (pair.bodyB.label === "Cheese") {
            this.mices[pair.bodyA.label].hasCheese = true;
            pair.bodyA.frictionAir = 0.03;
          }
          if (
            pair.bodyB.label === "Hole" &&
            this.mices[pair.bodyA.label].hasCheese
          ) {
            this.mices[pair.bodyA.label].hasWin = true;
            Matter.Sleeping.set(pair.bodyA, true);
          }
        }
      });
    });
  }

  get emit() {
    let grounds = this.entities.grounds.map((ground, idx) => {
      const { min, max } = ground.bounds;
      const width = max.x - min.x;
      const height = max.y - min.y;
      return {
        pos: ground.position,
        width,
        height,
        label: ground.label,
      };
    });

    return {
      roomId: this.roomId,
      timeEnd: this.timeEnd,
      mices: [...Object.values(this.mices)],
      grounds,
    };
  }

  initMices(players) {
    let mices = {};
    Object.values(players).map((p, i) => {
      mices[p] = {
        pos: { x: 0, y: 0 },
        isJumped: false,
        isAlive: true,
        hasCheese: false,
        hasWin: false,
        isRunningLeft: false,
        isRunningRight: false,
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
        return new MapEnums(200, {
          startX: this.startX,
          startY: this.startY,
          playerId: Object.values(this.playerlist)[i],
        }).entity;
      }),
      grounds: [
        new MapEnums(10, { isStatic: true, x: 400, y: 400, w: 800, h: 100 })
          .entity,
        new MapEnums(10, { isStatic: true, x: 600, y: 200, w: 20, h: 480 })
          .entity,
      ],
      mices_object: [
        new MapEnums(40, { x: 20, y: 300 }).entity,
        new MapEnums(41, { x: 200, y: 320 }).entity,
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
      if (mbody && !this.mices[playerId].hasWin) {
        if (action == "right") {
          Matter.Body.translate(mbody, Matter.Vector.create(4, 0));
          this.mices[playerId].isRunningRight = true;
        } else if (action == "left") {
          Matter.Body.translate(mbody, Matter.Vector.create(-4, 0));
          this.mices[playerId].isRunningLeft = true;
        } else if (action == "up" && !this.mices[playerId].isJumped) {
          this.mices[playerId].isJumped = true;
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(mbody.velocity.x, -10)
          );
        } else {
          this.mices[playerId].isRunningRight = false;
          this.mices[playerId].isRunningLeft = false;
        }
      }
    }
  }
}

module.exports = Map;
