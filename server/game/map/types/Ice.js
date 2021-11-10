const Matter = require("matter-js");

class Ice {
  constructor({ isStatic, x, y, w, h, angle }) {
    this.isStatic = isStatic;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  get typeId() {
    return 12;
  }

  get entity() {
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Ice",
      isStatic: this.isStatic,
      friction: 0,
      frictionStatic: 0,
      restitution: 0.1,
      angle: this.angle,
    });
  }
}

module.exports = Ice;
