'use strict';

const jq = require('jquery');

const Element = use('gui/elements/Element');

/**
 * @Service('gui')
 */
module.exports = class GUI {

  jq() {
    return jq;
  }

  select(selector, context = null) {
    return this.jq()(selector, context);
  }

  getItem(object) {
    if (typeof object === 'string') {
      return this.select(object);
    }
    if (object instanceof this.jq()) {
      return object;
    }
    if (object instanceof Element) {
      return object.item();
    }
    return null;
  }

  getRender(object) {
    if (typeof object === 'string') {
      return object;
    }
    if (object instanceof this.jq()) {
      return object;
    }
    if (object instanceof Element) {
      return object.render();
    }
    return null;
  }

  append(element, append) {
    const item = this.getItem(element);

    item.append(this.getRender(append));
    if (append instanceof Element) {
      append.attach();
    }
  }

}
