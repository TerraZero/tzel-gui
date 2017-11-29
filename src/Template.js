'use strict';

const manager = use('manager.template');

module.exports = class Template {

  constructor(name) {
    this._name = name;
    this._path = null;
    this._tpl = null;
  }

  name() {
    return this._name;
  }

  path() {
    if (this._path === null) {
      this._path = manager.getTemplateRoot().join(this.name() + '.tpl.js');
    }
    return this._path;
  }

  tpl(reset = false) {
    if (this._tpl === null || reset) {
      this._tpl = require(this.path().norm());
    }
    return this._tpl;
  }

  args() {
    return {};
  }

  render() {
    return manager.render(this);
  }

}
