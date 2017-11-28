'use strict';

const Input = use('gui/inputs/Input');

module.exports = class Submit extends Input.class {

  constructor(key, value) {
    super(key);

    this.value(value);
  }

  space() {
    return 'submit';
  }

  getType() {
    return 'submit';
  }

  tpl() {
    return 'forms.inputs.submit';
  }

}
