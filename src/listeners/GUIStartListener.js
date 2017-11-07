'use strict';

const Window = use('gui/Window');

module.exports = class GUIStartListener {

  /**
   * @Inject('manager.template')
   */
  inject(templates) {
    this._templates = templates;
  }

  /**
   * @Listener('core.boot')
   */
  boot(event) {
    if (!Window.isGUISupport()) return;
    new Window('boot.frame', {
      width: 800,
      height: 500,
      frame: false,
    }).open();
  }

  /**
   * @Listener('gui.window.open')
   */
  open(event) {
    const window = event.get('window');

    window.load(this._templates.getTemplateRoot().join('base.tpls.page.html'));
    window.openTools();
  }

}
