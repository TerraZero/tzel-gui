'use strict';

const Form = use('gui/forms/Form');
const NextForm = use('gui/forms/NextForm');

module.exports = class LoginForm extends Form.class {

  id() {
    return 'form-login';
  }

  fields() {
    return [
      this.createField('User', 'user'),
      this.createField('Password', 'pass'),
    ];
  }

  actions() {
    return [
      {
        name: 'Submit',
        key: 'submit',
        validates: [
          this.validate,
        ],
        submits: [
          this.submit,
        ],
      },
      {
        name: 'Next',
        key: 'next',
        submits: [
          this.next,
        ],
      }
    ];
  }

  validate(builder, view, action) {
    if (this._thg === undefined) {
      this.setError('user', 'ERROR: Test Error');
      this._thg = true;
    } else {
      this._thg = undefined;
    }
  }

  submit(builder, view, action) {
    log('submit');
  }

  next(builder, view, action) {
    builder.setForm(new NextForm());
  }

}
