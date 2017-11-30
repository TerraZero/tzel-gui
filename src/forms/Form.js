'use strict';

const View = use('gui/View');

module.exports = class Form extends View.class {

  createData() {
    this._data.form = {
      actions: this.buttons(),
      fields: this.fields(),
    };

    return this._data;
  }

  methods() {
    const that = this;
    return {

      action(button) {
        that.action(this, button);
      }

    };
  }

  getField(field) {
    let root = this._data.form;

    for (const part of field.split('.')) {
      for (const field of root.fields) {
        if (field.key === part) {
          root = field;
          break;
        }
      }
    }
    return root;
  }

  getValue(field) {
    const root = this.getField(field);

    if (root.value !== undefined) return root.value;
    return this.getValueRecursive(root);
  }

  getValueRecursive(root) {
    const value = {};

    for (const field of root.fields) {
      if (field.value === undefined) {
        value[field.key] = this.getValueRecursive(field.fields);
      } else {
        value[field.key] = field.value;
      }
    }
    return value;
  }

  fields() {
    return [];
  }

  buttons() {
    return [];
  }

  action(view, trigger) {
    if (typeof trigger.action === 'function') {
      trigger.action.apply(this, [view, trigger]);
    }
  }

}
