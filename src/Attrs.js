'use strict';

module.exports = class Attrs {

  constructor() {
    this._attrs = {};
  }

  attrs() {
    return this._attrs;
  }

  attr(name, value = undefined) {
    if (value === undefined) {
      return this._attrs[name];
    } else if (value === null) {
      delete this._attrs[name];
    } else {
      this._attrs[name] = value;
    }
    return this;
  }

  addClass(name) {
    if (!this.hasClass(name)) {
      this._attrs.class = this._attrs.class || [];
      this._attrs.class.push(name);
    }
    return this;
  }

  hasClass(name) {
    return this._attrs.class && this._attrs.class.indexOf(name) !== -1 || false;
  }

  removeClass(name) {
    if (this.hasClass(name)) {
      const index = this._attrs.class.indexOf(name);

      this._attrs.class.splice(index, 1);
    }
    return this;
  }

}
