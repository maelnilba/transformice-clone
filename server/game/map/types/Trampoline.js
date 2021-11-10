const Matter = require("matter-js");

class Trampoline {
  constructor({ isStatic, x, y, w, h, angle }) {
    this.isStatic = isStatic;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
  }

  get typeId() {
    return 13;
  }

  get entity() {
    let body = Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Trampoline",
      isStatic: this.isStatic,
      angle: this.angle,
    });

    body.restitution = 1;
    body.friction = 0.3;
    return body;
  }
}

module.exports = Trampoline;
