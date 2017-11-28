'use strict';

const Input = use('gui/inputs/Input');

module.exports = class Textfield extends Input.class {

  constructor(key) {
    super(key);
  }

  getType() {
    return 'text';
  }

}
