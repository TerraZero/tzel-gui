'use strict';

const Element = use('gui/elements/Element');

module.exports = class Input extends Element.class {

  constructor(key) {
    super();
    this._key = key;

    this.type(this.getType());
  }

  key() {
    return this._key;
  }

  space() {
    return 'input';
  }

  tpl() {
    return 'forms.inputs.input';
  }

  getType() {
    return null;
  }

  attrs() {
    return {
      id: 'string',
      class: 'array',
      type: 'string',
      value: 'string',
    };
  }

  args() {
    return [
      'label',
    ];
  }

  elements() {
    return {
      label: '> .form-item__label',
      input: '> .form-item__input > input',
      inputWrapper: '> .form-item__input',
    };
  }

  setValue(value) {
    this.el('input').val(value);
    return this;
  }

  getValue() {
    return this.el('input').val();
  }

}
