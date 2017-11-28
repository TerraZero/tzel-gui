'use strict';

const Input = use('gui/inputs/Input');

module.exports = class InputCollection extends Input.class {

  constructor(key) {
    super(key);
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

  setValue(value) {
    return this;
  }

  getValue() {
    const values = {};

    for (const item of this.items()) {
      values[item.key()] = item.getValue();
    }
    return values;
  }

  getInput(name) {
    const parts = name.split('.');
    let value = this.getValue();

    for (const part of parts) {
      value = value[part];
    }
    return value;
  }

  getField(name) {
    const parts = name.split('.');
    let items = this.items();

    for (const part of parts) {
      for (const item of items) {
        if (item.key() === part) {
          items = item;
        }
      }
    }
    return items;
  }

}
