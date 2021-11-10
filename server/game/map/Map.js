const Matter = require("matter-js");
const Constructor = require("./Constructor");
const frameRate = 1000 / 30;
const Groundlabel = ["Wood", "Lava", "Ice", "Trampoline"];

const distance = (x1, y1, x2, y2) => {
  var x = Math.abs(x1 - x2);
  var y = Math.abs(y1 - y2);
  return Math.sqrt(x * x + y * y);
};

class Map {
  constructor(roomId, players, parent, mapjson) {
    this.parent = parent;
    this.roomId = roomId;
    this.timeStart = new Date();
    this.timeEnd = new Date().setTime(new Date().getTime() + 2 * 60 * 1000);
    this.playerlist = players;
    this.mapConstructor = new Constructor(mapjson);
    this.records = {};
    this.mices = this.initMices(players);
    this.engine = Matter.Engine.create();
    this.entities = this.mapConstructor.initMap(
      this.mices,
      this.engine,
      this.playerlist
    );
    this.runtime = setInterval(() => {
      if (this.mapConstructor.init) {
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
      }
    }, frameRate);

    Matter.Events.on(this.engine, "collisionStart", (p) => {
      p.pairs.forEach((pair) => {
        if (this.mices[pair.bodyB.label]) {
          if (Groundlabel.includes(pair.bodyA.label)) {
            //if (pair.bodyA.friction > 0.1) {
            this.mices[pair.bodyB.label].isJumped = false;
            //}
          }
          if (pair.bodyA.label === "Cheese") {
            this.mices[pair.bodyB.label].hasCheese = true;
            pair.bodyB.frictionAir = 0.03;
          }
          if (
            pair.bodyA.label === "Hole" &&
            this.mices[pair.bodyB.label].hasCheese
          ) {
            this.mices[pair.bodyB.label].hasWin = true;
            this.records[pair.bodyB.label] = {
              username: this.mices[pair.bodyB.label].username,
              hasWinAt: new Date() - this.timeStart,
            };
            Matter.Sleeping.set(pair.bodyB, true);
          }
        }
      });
    });
  }

  get emit() {
    let grounds = this.entities.grounds.map((ground, idx) => {
      const width = distance(
        ground.vertices[0].x,
        ground.vertices[0].y,
        ground.vertices[1].x,
        ground.vertices[1].y
      );
      const height = distance(
        ground.vertices[0].x,
        ground.vertices[0].y,
        ground.vertices[3].x,
        ground.vertices[3].y
      );
      return {
        pos: ground.position,
        width,
        height,
        label: ground.label,
        rotation: ground.angle,
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
        pos: this.mapConstructor.startPos,
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
          // Matter.Body.setVelocity(
          //   mbody,
          //   Matter.Vector.create(0, mbody.velocity.y)
          // );
          Matter.Body.translate(mbody, Matter.Vector.create(4, 0));

          if (!this.mices[playerId].isRunningRight) {
            this.mices[playerId].tick = 0;
          }
          this.mices[playerId].isRunningLeft = false;
          this.mices[playerId].isRunningRight = true;
        } else if (action == "left") {
          // Matter.Body.setVelocity(
          //   mbody,
          //   Matter.Vector.create(0, mbody.velocity.y)
          // );
          Matter.Body.translate(mbody, Matter.Vector.create(-4, 0));

          if (!this.mices[playerId].isRunningLeft) {
            this.mices[playerId].tick = 0;
          }
          this.mices[playerId].isRunningRight = false;
          this.mices[playerId].isRunningLeft = true;
        } else if (action == "up" && !this.mices[playerId].isJumped) {
          this.mices[playerId].tick = 0;
          this.mices[playerId].isJumped = true;
          // Matter.Body.translate(mbody, Matter.Vector.create(0, -40));
          Matter.Body.setVelocity(
            mbody,
            Matter.Vector.create(mbody.velocity.x, -10)
          );
          // Matter.Body.applyForce(mbody, mbody.position, { x: 0, y: -0.1 });
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
