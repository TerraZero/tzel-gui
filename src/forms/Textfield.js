'use strict';

const Input = use('gui/forms/Input');

module.exports = class Textfield extends Input.class {

  constructor(id) {
    super();
    this.id(id);
  }

  tpl() {
    return 'forms.inputs.textfield';
  }

  type() {
    return 'text';
  }

}
