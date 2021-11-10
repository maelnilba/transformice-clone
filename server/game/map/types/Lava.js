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
    let body = Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Lava",
      isStatic: this.isStatic,
      angle: this.angle,
    });
    body.restitution = 3;
    body.friction = 0;
    return body;
  }
}

module.exports = Lava;
