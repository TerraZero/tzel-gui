'use strict';

const jq = require('jquery');

const Manifest = use('core/reflect/Manifest');
const Mount = use('gui/annotations/Mount');

module.exports = class MountListener {

  /**
   * @Listener('core.boot.window')
   */
  mount(event) {
    const mounts = Manifest.getRegister('provider.mount', 'root');
    const screen = jq('.boot');

    for (const mount of mounts) {
      const m = Manifest.provide('mount', mount.key);

      screen.append('<div class="mount-' + mount.value + '"></div>');
      m.mount('.mount-' + mount.value);
    }
  }

}
