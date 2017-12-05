'use strict';

const Form = use('gui/forms/Form');

module.exports = class NextForm extends Form.class {

  id() {
    return 'form-next';
  }

  fields() {
    return [
      this.createField('Server', 'host'),
      this.createField('Port', 'port'),
    ];
  }

}
