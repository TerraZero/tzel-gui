'use strict';

const View = use('gui/View');

/**
 * @Service('builder.form')
 */
module.exports = class FormBuilder extends View.class {

  constructor() {
    super();
    this._errors = [];
    this._form = null;
    this._data = {
      form: {
        actions: [],
        fields: [],
        errors: [],
      },
    }
  }

  tpl() {
    return 'forms.form';
  }

  localComponents() {
    return [
      {
        name: 'form-field',
        template: 'forms.formfield',
        props: ['field'],
        methods: {

          fieldClass: function (key) {
            return 'field-wrapper-' + key;
          },

        },
      }
    ];
  }

  setForm(form) {
    this._form = form;
    this._data.form.id = form.id();
    this._data.form.actions = form.getActions();
    this._data.form.fields = form.getFields();
    this._data.form.errors = form.getErrors();
    return this;
  }

  getForm() {
    return this._form;
  }

  createData() {
    return this._data;
  }

  methods() {
    const builder = this;
    return {

      handleSubmit(action) {
        builder.getForm().handleSubmit(builder, this, action);
      }

    };
  }

}
