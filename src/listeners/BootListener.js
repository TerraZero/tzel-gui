'use strict';

const jq = require('jquery');

const LoginForm = use('gui/forms/LoginForm');

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
    const login = new LoginForm();

    this._gui.append('.boot.frame', login);
    this._window.setStatus('borderscreen');
  }

}
