const Matter = require("matter-js");

class Mice {
  constructor({ startX, startY, playerId }) {
    this.playerId = playerId;
    this.startX = startX;
    this.startY = startY;
  }

  get typeId() {
    return 200;
  }

  get entity() {
    return Matter.Bodies.circle(this.startX, this.startY, 20, {
      label: this.playerId,
      friction: 0.3,
      restitution: 0.2,
      inertia: Infinity,
      collisionFilter: {
        group: -1,
      },
    });
  }
}

module.exports = Mice;
