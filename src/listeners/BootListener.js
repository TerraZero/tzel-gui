'use strict';

const jq = require('jquery');

const Textfield = use('gui/forms/Textfield');
const Collection = use('gui/elements/Collection');

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
    const c = new Collection();

    c.add(new Textfield('cool').label('Test Label'));
    c.add(new Textfield('cool-2').label('Test Label 2'));

    jq('.boot.frame').append(c.render());
  }

}
