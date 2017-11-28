'use strict';

const InputCollection = use('gui/inputs/InputCollection');

module.exports = class Form extends InputCollection.class {

  constructor(key) {
    super(key);

    this.getTemplate().set('buttons', []);
    this._errors = [];
    this.form();
  }

  form() {

  }

  space() {
    return 'form';
  }

  args() {
    return [
      'layout',
      'items',
      'title',
    ];
  }

  elements() {
    return {
      errors: '> .error-container',
    };
  }

  tpl() {
    return 'forms.form';
  }

  addButton(button) {
    this.getTemplate().get('buttons').push(button);
  }

  attach() {
    this.item().submit(this.submitHandle.bind(this));
  }

  resetErrors() {
    this._errors = [];
    return this;
  }

  hasError() {
    return this._errors.length > 0;
  }

  setError(text, element = null) {
    if (typeof element === 'string') {
      element = this.getField(element);
    }
    this._errors.push({
      text: text,
      element: element,
    });
    return this;
  }

  getErrors() {
    return this._errors;
  }

  showErrors() {
    const container = this.el('errors');

    container.html('');
    this.item().find('.error-item').removeClass('error-item');

    if (!this.hasError()) return this;
    for (const error of this.getErrors()) {
      container.append('<div class="error">' + error.text + '</div>');
      if (error.element) error.element.item().addClass('error-item');
    }
  }

  submitHandle(e) {
    e.preventDefault();

    this.validateHandle();
    if (!this.hasError()) {
      this.submit();
    }
  }

  validateHandle() {
    this.resetErrors();
    this.validate();
    this.showErrors();
  }

  validate() {

  }

  submit() {

  }

}
