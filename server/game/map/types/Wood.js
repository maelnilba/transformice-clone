const Matter = require("matter-js");

class Wood {
  constructor({ isStatic, x, y, w, h, angle }) {
    this.isStatic = isStatic;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  get typeId() {
    return 10;
  }

  get entity() {
    let body = Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Wood",
      isStatic: this.isStatic,
      angle: this.angle,
    });
    body.restitution = 0.2;
    body.friction = 0.3;
    return body;
  }
}

module.exports = Wood;
