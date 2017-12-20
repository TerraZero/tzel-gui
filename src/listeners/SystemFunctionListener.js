'use strict';

const Subject = use('core/Subject');
const SystemFunction = use('gui/annotations/SystemFunction');
const jq = require('jQuery');

module.exports = class SystemFunctionListener {

  constructor() {
    this._systemFunctions = null;
    this._subject = new Subject();
  }

  /**
   * @Inject('system.messages')
   */
  inject(sys) {
    this._sys = sys;
  }

  getSystemFunctions() {
    if (this._systemFunctions === null) {
      this._systemFunctions = {};
      const datas = boot.getDatas();

      for (const index in datas) {
        if (datas[index].hasTag(SystemFunction.name)) {
          const annots = datas[index].getAnnotation(SystemFunction.name);

          for (const annot of annots) {
            if (this._systemFunctions[annot.data.value] === undefined) {
              this._systemFunctions[annot.data.value] = [];
            }
            this._systemFunctions[annot.data.value].push({
              use: datas[index].use(),
              annotation: annot,
            });
          }
        }
      }
    }
    return this._systemFunctions;
  }

  executeFor(e, key) {
    const sf = this.getSystemFunctions();

    if (sf[key] !== undefined) {
      for (const item of sf[key]) {
        const subject = this._subject.get(item.use);

        subject[item.annotation.target].call(subject, e, key, this._sys);
        if (e.isPropagationStopped()) return;
      }
    }
    if (sf[null] !== undefined) {
      for (const item of sf[null]) {
        const subject = this._subject.get(item.use);

        subject[item.annotation.target].call(subject, e, key, this._sys);
        if (e.isPropagationStopped()) return;
      }
    }
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
