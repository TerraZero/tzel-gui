'use strict';

const Window = use('gui/Window');

module.exports = class GUIStartListener {

  /**
   * @Listener('core.boot')
   */
  boot(event) {
    new Window('boot.frame', {
      width: 800,
      height: 500,
      frame: false,
    }).open();
  }

}
