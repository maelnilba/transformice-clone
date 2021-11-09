export class LimitedArray {
  constructor(size) {
    this.size = size;
    this.arr = new Array();
  }

  push(v) {
    if (this.arr.length == this.size) {
      this.arr.shift();
    }
    this.arr.push(v);
  }

  get a() {
    return this.arr;
  }

  get length() {
    return this.arr.length;
  }
}
