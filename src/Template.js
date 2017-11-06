'use strict';

module.exports = class Template {

  constructor(name) {
    this._name = name;
    this._args = {};
    this._tpl = null;
    this._path = null;
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

  tpl(reset = false) {
    if (this._tpl === null || reset) {
      this._tpl = require(this.path().norm());
    }
    return this._tpl;
  }

  render() {
    return this.tpl()(this.args());
  }

}
