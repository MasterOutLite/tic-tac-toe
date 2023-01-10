"use strict";

class Player {
  #_type;

  get type() {
    return this.#_type;
  }

  constructor(type) {
    this.#_type = type;
  }
}
