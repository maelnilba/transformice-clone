const Matter = require("matter-js");

class Cheese {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  get typeId() {
    return 40;
  }

  get entity() {
    return Matter.Bodies.rectangle(this.x, this.y, 40, 20, {
      label: "Cheese",
      isStatic: true,
      isSensor: true,
    });
  }
}

module.exports = Cheese;
