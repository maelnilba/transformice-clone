const Matter = require("matter-js");

class Lava {
  constructor({ isStatic, x, y, w, h, angle }) {
    this.isStatic = isStatic;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  get typeId() {
    return 11;
  }

  get entity() {
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Lava",
      isStatic: this.isStatic,
      friction: 0.3,
      frictionStatic: 0.3,
      restitution: 20,
      angle: this.angle,
    });
  }
}

module.exports = Lava;
