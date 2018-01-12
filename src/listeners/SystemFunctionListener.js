'use strict';

const Manifest = use('core/reflect/Manifest');
const jq = require('jQuery');

module.exports = class SystemFunctionListener {

  /**
   * @Inject('system.messages')
   */
  inject(sys) {
    this._sys = sys;
  }

  executeFor(e, key) {
    const register = Manifest.getRegister('provider.system.functions');

    if (this.executeList(e, key, register[key])) {
      this.executeList(e, key, register[null]);
    }
  }

  executeList(e, key, list) {
    if (list === undefined) return true;

    for (const item of list) {
      const subject = use(item.key);

      subject[item.target].call(subject, e, key, this._sys);
      if (e.isPropagationStopped()) return false;
    }
    return true;
  }

  /**
   * @Listener('core.boot.window')
   */
  bootWindow() {
    jq('body').keydown((e) => {
      this.executeFor(e, e.key);
    });
  }

}
