'use strict';

const jq = require('jquery');

const Template = use('gui/Template');

const manager = use('manager.template');

const elements = {};

module.exports = class Element {

  static get(uuid) {
    return elements['uuid-' + uuid] || null;
  }

  constructor() {
    this._tpl = null;
    this._values = {};
    this._elements = {};
    this._item = null;
    this._rendered = null;
    this._id = null;

    this.init();
  }

  init() {
    const mapping = this.args();

    for (const name of mapping) {
      this[name] = (function (value = undefined) {
        if (value === undefined) {
          return this.that.getTemplate().get(this.name);
        } else {
          this.that.getTemplate().set(this.name, value);
          return this.that;
        }
      }).bind({ that: this, name: name });
    }

    const attrs = this.attrs();

    for (const name in attrs) {
      this[name] = (function (value = undefined) {
        switch (this.type) {
          case 'string':
            return this.that.getTemplate().attr(this.name, value);
          case 'array':
            const array = this.that.getTemplate().attr(this.name) || [];

            if (value === undefined) {
              return array;
            }
            array.push(value);
            this.that.getTemplate().attr(this.name, array);
            return this.that;
        }

      }).bind({ that: this, name: name, type: attrs[name] });
    }

    const elements = this.elements();

    for (const name in elements) {
      this._elements[name] = {
        name: name,
        selector: elements[name],
        item: null,
      };
    }

    const uuid = manager.getID('uuid');

    elements[uuid] = this;
    this.getTemplate().set('uuid', uuid);
    this.getTemplate().attr('id', manager.getID(this.space()));
  }

  uuid() {
    return this.getTemplate().get('uuid');
  }

  space() {
    return 'element';
  }

  attrs() {
    return {
      id: 'string',
      class: 'array',
    };
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
      this._elements[name].item = jq(this._elements[name].selector, this.item());
    }
    return this._elements[name].item;
  }

  set(name, prop) {
    if (typeof this[name] === 'function') {
      this[name](prop);
    } else {
      this._values[name] = prop;
    }
    return this;
  }

  get(name) {
    if (typeof this[name] === 'function') {
      return this[name]();
    } else {
      return this._values[name];
    }
  }

  getTemplate() {
    if (this._tpl === null) {
      this._tpl = new Template(this.tpl());
    }
    return this._tpl;
  }

  item() {
    if (this._item === null) {
      this._item = jq('.' + this.uuid());
    }
    return this._item;
  }

  render(reset = false) {
    if (this._rendered === null || reset) {
      this._rendered = this.getTemplate().render();
    }
    return this._rendered;
  }

  attachHandle() {
    this.attach();
  }

  attach() {

  }

}
