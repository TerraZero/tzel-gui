'use strict';

const Form = use('gui/forms/Form');

module.exports = class LoginForm extends Form.class {

  tpl() {
    return 'forms.login';
  }

  fields() {
    return [
      {
        name: 'User',
        value: '',
        key: 'user',
      },
      {
        name: 'Password',
        value: '',
        key: 'pass',
      },
      {
        key: 'col',
        fields: [
          {
            name: 'First 1',
            value: '',
            key: 'first',
          }
        ],
      }
    ];
  }

  buttons() {
    return [
      {
        name: 'Submit',
        key: 'submit',
        action: this.submit,
      }
    ];
  }

  submit(view, trigger) {
    log(this.getValue('col'));
  }

}
