'use strict';

const Form = use('gui/inputs/Form');
const Textfield = use('gui/inputs/Textfield');
const Submit = use('gui/inputs/Submit');

module.exports = class LoginForm extends Form.class {

  constructor() {
    super('login-form');
  }

  form() {
    this.title('Login Form');
    this.add(new Textfield('user').label('User'));
    this.add(new Textfield('pass').label('Password'));
    this.addButton(new Submit('main', 'Login'));
  }

  validate() {
    if (this.getInput('user') != 'hallo') {
      this.setError('The user is wrong', 'user');
    }
  }

  submit() {
    log('submit');
  }

}
