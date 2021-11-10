const Cheese = require("../Cheese");
const Hole = require("../Hole");
const Mice = require("../Mice");
const Wood = require("../Wood");
const Ice = require("../Ice");
const Lava = require("../Lava");
const Trampoline = require("../Trampoline");

class MapEnums {
  constructor(id, params) {
    this.enums = {};
    this.id = id;
    this.params = params;
    this.init();
    this.entitie = this.getInstance(this.id, this.params);
  }

  init() {
    this.enums[200] = Mice;
    this.enums[10] = Wood;
    this.enums[11] = Lava;
    this.enums[12] = Ice;
    this.enums[13] = Trampoline;
    this.enums[40] = Cheese;
    this.enums[41] = Hole;
  }

  getInstance(type, params) {
    let instanceType = this.enums[type];
    if (!instanceType) {
      throw "no instancetype";
    }

    let instance = new instanceType(params);
    return instance;
  }

  get entity() {
    return this.entitie.entity;
  }
}

module.exports = MapEnums;
