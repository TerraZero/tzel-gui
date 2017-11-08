'use strict';

module.exports = class BootListener {

  /**
   * @Inject('manager.template')
   * @Inject('gui')
   */
  inject(tpls, gui) {
    this._tpls = tpls;
    this._gui = gui;
  }

  /**
   * @Listener('core.boot')
   */
  boot(event) {
    const tpl = this._tpls.get('frame.screen');
  }

}
