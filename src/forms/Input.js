'use strict';

const Element = use('gui/elements/Element');

module.exports = class Input extends Element.class {

  constructor() {
    super();
    this.getTemplate().set('type', this.type());
  }

  tpl() {
    return 'forms.inputs.textfield';
  }

  type() {
    return null;
  }

  args() {
    return [
      'id',
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

  value(value) {
    if (value === undefined) {
      return this.el('input').val();
    } else {
      this.el('input').val(value);
      return this;
    }
  }

}
