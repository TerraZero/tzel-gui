'use strict';

module.exports = class Template {

  constructor(name) {
    this._name = name;
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
    return this._manager.getTemplateRoot().join(this.name() + '.tpl.js');
  }

  render(args = {}) {
    return require(this.path().norm())(args);
  }

}
