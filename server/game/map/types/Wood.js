const Matter = require("matter-js");

class Wood {
  constructor({ isStatic, x, y, w, h }) {
    this.isStatic = isStatic;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get typeId() {
    return 10;
  }

  get entity() {
    return Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, {
      label: "Wood",
      isStatic: this.isStatic,
      friction: 0.3,
      frictionStatic: 0.3,
    });
  }
}

module.exports = Wood;
