'use strict';

module.exports = class Template {

  constructor(name) {
    this._name = name;
    this._path = null;
    this._tpl = null;
    this._args = {};
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

  tpl(reset = false) {
    if (this._tpl === null || reset) {
      this._tpl = require(this.path().norm());
    }
    return this._tpl;
  }

  setArg(name, value) {
    this._args[name] = value;
    return this;
  }

  setArgs(args = {}) {
    args.attrs = args.attrs || {};
    this._args = args;
    return this;
  }

  getArgs() {
    return this._args;
  }

  render() {
    return this._manager.render(this);
  }

}
