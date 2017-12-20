'use strict';

const jq = require('jquery');

const Mount = use('gui/annotations/Mount');

module.exports = class MountListener {

  /**
   * @Listener('core.boot.window')
   */
  mount(event) {
    const datas = boot.getDatas();
    const screen = jq('.boot');

    for (const index in datas) {
      if (datas[index].hasTag(Mount.name)) {
        const annotation = datas[index].getAnnotation(Mount.name);

        screen.append('<div class="mount-' + annotation[0].data.value + '"></div>');
        use(datas[index].serve()).mount('.mount-' + annotation[0].data.value);
      }
    }
  }

}
