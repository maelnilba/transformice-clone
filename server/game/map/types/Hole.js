const Matter = require("matter-js");

class Hole {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get typeId() {
    return 41;
  }

  get entity() {
    return Matter.Bodies.rectangle(this.x, this.y, 30, 30, {
      label: "Hole",
      isStatic: true,
      isSensor: true,
    });
  }
}

module.exports = Hole;
