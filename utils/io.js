/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-class */

import { isFunction } from "lodash";

export default class IO {
  constructor(effect) {
    if (!isFunction(effect)) {
      throw new TypeError("IO Usage: function required");
    }
    this.effect = effect;
  }
  static of(a) {
    return new IO(() => a);
  }
  static from(fn) {
    return new IO(fn);
  }
  map(fn) {
    const self = this;
    return new IO(function() {
      return fn(self.effect());
    });
  }
  chain(fn) {
    return fn(this.effect());
  }
  run() {
    return this.effect();
  }
}
