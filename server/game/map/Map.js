const Matter = require("matter-js");
const MapEnums = require("./types/enums/MapEnums");
const frameRate = 1000 / 30;
const canvas = { width: 800, height: 400 };

class Map {
  constructor(roomId, players, parent) {
    this.parent = parent;
    this.roomId = roomId;
    this.timeStart = new Date();
    this.timeEnd = new Date().setTime(new Date().getTime() + 2 * 60 * 1000);
    this.playerlist = players;

    this.records = {};
    this.startX = 200;
    this.startY = 200;
    this.mices = this.initMices(players);
    this.engine = Matter.Engine.create();
    this.entities = this.initEntities(this.mices);
    this.runtime = setInterval(() => {
      Matter.Engine.update(this.engine, frameRate);
      let MapIsOver = true;
      this.entities.mices.map((m, i) => {
        this.mices[m.label].pos = m.position;
        this.mices[m.label].tick = this.mices[m.label].tick + 1;
        if (
          m.position.y > 500 ||
          m.position.x > 900 ||
          m.position.x < -100 ||
          m.position.y < -500
        ) {
          this.mices[m.label].isAlive = false;
          Matter.Sleeping.set(m, true);
        }
        if (!this.mices[m.label].hasWin && this.mices[m.label].isAlive) {
          MapIsOver = false;
        }
      });
      this.parent.emit();
      if (MapIsOver) {
        this.parent.mapOver();
      }
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
            this.records[pair.bodyA.label] = {
              username: this.mices[pair.bodyA.label].username,
              hasWinAt: new Date() - this.timeStart,
            };
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

    let mices_object = this.entities.mices_object.map((obj, idxs) => {
      return {
        pos: obj.position,
        label: obj.label,
      };
    });

    return {
      mapinfos: {
        roomId: this.roomId,
        timeEnd: this.timeEnd,
      },
      records: [...Object.values(this.records)],
      entities: {
        mices: [...Object.values(this.mices)],
        grounds,
        mices_object,
      },
    };
  }

  initMices(players) {
    let mices = {};
    Object.values(players).map((p, i) => {
      mices[p.id] = {
        username: p.username,
        pos: { x: this.startX, y: this.startY },
        isJumped: false,
        isAlive: true,
        hasCheese: false,
        hasWin: false,
        hasWinAt: 0,
        isRunningLeft: false,
        isRunningRight: false,
        direction: "right",
        isShaman: false,
        tick: 0,
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
          playerId: Object.values(this.playerlist)[i].id,
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
          if (!this.mices[playerId].isRunningRight) {
            this.mices[playerId].tick = 0;
          }
          this.mices[playerId].isRunningLeft = false;
          this.mices[playerId].isRunningRight = true;
        } else if (action == "left") {
          Matter.Body.translate(mbody, Matter.Vector.create(-4, 0));
          if (!this.mices[playerId].isRunningLeft) {
            this.mices[playerId].tick = 0;
          }
          this.mices[playerId].isRunningRight = false;
          this.mices[playerId].isRunningLeft = true;
        } else if (action == "up" && !this.mices[playerId].isJumped) {
          this.mices[playerId].tick = 0;
          this.mices[playerId].isJumped = true;
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(mbody.velocity.x, -10)
          );
        } else if (action == "stop") {
          if (this.mices[playerId].isRunningRight) {
            this.mices[playerId].direction = "right";
          }
          if (this.mices[playerId].isRunningLeft) {
            this.mices[playerId].direction = "left";
          }
          this.mices[playerId].tick = 0;
          this.mices[playerId].isRunningRight = false;
          this.mices[playerId].isRunningLeft = false;
        }
      }
    }
  }
}

module.exports = Map;
