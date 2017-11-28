'use strict';

const Element = use('gui/elements/Element');

module.exports = class Collection extends Element.class {

  constructor() {
    super();
    this.getTemplate().set('items', []);
  }

  tpl() {
    return 'elements.collection';
  }

  args() {
    return [
      'layout',
      'items',
    ];
  }

  add(item) {
    this.getTemplate().get('items').push(item);
    return this;
  }

  attachHandle() {
    for (const item of this.items()) {
      item.attachHandle();
    }
    this.attach();
  }

}
