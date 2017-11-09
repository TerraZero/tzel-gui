'use strict';

module.exports = class BootListener {

  /**
   * @Inject('manager.template')
   * @Inject('gui')
   * @Inject('window')
   */
  inject(tpls, gui, window) {
    this._tpls = tpls;
    this._gui = gui;
    this._window = window;
  }

  /**
   * @Listener('core.boot')
   */
  boot(event) {

  }

}
