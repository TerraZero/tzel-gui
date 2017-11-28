'use strict';

module.exports = class Template {

  constructor(name) {
    this._name = name;
    this._args = {};
    this._tpl = null;
    this._path = null;

    const attr = {};
    Object.defineProperty(attr, 'rm', {
      value: function (name) {
        delete this[name];
        return this;
      },
    });
    this.set('attr', attr);
  }

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    this._manager = manager;
  }

  name() {
    return this._name;
  }

  path() {
    if (this._path === null) {
      this._path = this._manager.getTemplateRoot().join(this.name() + '.tpl.js');
    }
    return this._path;
  }

  args() {
    return this._args;
  }

  get(prop) {
    return this.args()[prop] || null;
  }

  set(prop, value) {
    this.args()[prop] = value;
    return this;
  }

  attr(prop, value = undefined) {
    if (value === undefined) {
      return this.get('attr')[prop];
    } else {
      this.get('attr')[prop] = value;
      return this;
    }
  }

  tpl(reset = false) {
    if (this._tpl === null || reset) {
      this._tpl = require(this.path().norm());
    }
    return this._tpl;
  }

  mergeAttr(attr) {
    const current = this.get('attr');

    for (const i in attr) {
      if (current[i] === undefined || !Array.isArray(current[i])) {
        current[i] = attr[i];
      } else {
        for (const ia in attr) {
          current[i].push(attr[ia]);
        }
      }
    }
  }

  render(attr = null) {
    this.mergeAttr(attr);
    return this._manager.render(this);
  }

}
