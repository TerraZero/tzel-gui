'use strict';

module.exports = class Element {

  constructor() {
    this._tpl = null;
  }

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    this._manager = manager;
  }

  tpl() {
    return null;
  }

  getTemplate() {
    if (this._tpl === null) {
      this._tpl = this._manager.get(this.tpl());
    }
    return this._tpl;
  }

  render() {
    return this.getTemplate().render();
  }

}
