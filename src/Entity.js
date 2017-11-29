'use strict';

module.exports = class Entity {

  constructor() {
    this._data = {};
    this.init();
  }

  init() {

  }

  data() {
    return this._data;
  }

}
