'use strict';

const jq = require('jquery');

const Template = use('gui/Template');

module.exports = class Element {

  constructor() {
    this._tpl = null;
    this._mapping = null;
    this._values = {};
    this._elements = {};
    this._item = null;
    this.init();
  }

  init() {
    const mapping = this.mapping();

    for (const name of mapping) {
      this[name] = (function (value = null) {
        if (value === null) {
          return this.that.get(this.name);
        } else {
          return this.that.set(this.name, value);
        }
      }).bind({ that: this, name: name });
    }

    const elements = this.elements();

    for (const name in elements) {
      this._elements[name] = {
        name: name,
        selector: elements[name],
        item: null,
      };
    }
  }

  mapping() {
    if (this._mapping === null) {
      this._mapping = this.args();
    }
    return this._mapping;
  }

  args() {
    return [];
  }

  elements() {
    return {};
  }

  tpl() {
    return null;
  }

  el(name) {
    if (this._elements[name].item === null) {
      this._elements[name].item = jq(this._elements[name].selector, this.render());
    }
    return this._elements[name].item;
  }

  set(name, prop) {
    if (this.mapping().indexOf(name) === -1) {
      this._values[name] = prop;
    } else {
      this.getTemplate().set(name, prop);
    }
    return this;
  }

  get(name) {
    if (this.mapping().indexOf(name) === -1) {
      return this._values[name];
    } else {
      return this.getTemplate().get(name);
    }
  }

  getTemplate() {
    if (this._tpl === null) {
      this._tpl = new Template(this.tpl());
    }
    return this._tpl;
  }

  render() {
    if (this._item === null) {
      const string = this.getTemplate().render();

      this._item = jq(string);
      return string;
    }
    return this._item;
  }

}
