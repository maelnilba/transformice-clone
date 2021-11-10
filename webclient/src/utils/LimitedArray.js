export class LimitedArray {
  constructor(size) {
    this.size = size;
    this.arr = new Array();
  }

  push(v) {
    if (this.arr.length == this.size) {
      this.arr.pop();
    }
    this.arr.unshift(v);
  }

  get a() {
    return this.arr;
  }

  get length() {
    return this.arr.length;
  }
}
