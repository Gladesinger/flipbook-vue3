import {
  identity,
  multiply,
  perspective,
  translate,
  translate3d,
  rotateY,
  toString as matrixToString,
} from "rematrix";

export default class Matrix {
  constructor(arg) {
    if (arg) {
      if (arg.m) {
        this.m = [...arg.m];
      } else {
        this.m = [...arg];
      }
    } else {
      this.m = identity();
    }
  }

  clone() {
    return new Matrix(this);
  }

  multiply(m) {
    this.m = multiply(this.m, m);
  }

  perspective(d) {
    this.multiply(perspective(d));
  }

  transformX(x) {
    return (x * this.m[0] + this.m[12]) / (x * this.m[3] + this.m[15]);
  }

  translate(x, y) {
    this.multiply(translate(x, y));
  }

  translate3d(x, y, z) {
    this.multiply(translate3d(x, y, z));
  }

  rotateY(deg) {
    this.multiply(rotateY(deg));
  }

  toString() {
    return matrixToString(this.m);
  }
}
