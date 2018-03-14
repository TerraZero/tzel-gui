'use strict';

module.exports = class Form {

  constructor() {
    this._fields = null;
    this._actions = null;
    this._errors = [];
  }

  createField(name, key, classes = []) {
    return { name, key, classes, value: '' };
  }

  id() {
    return null;
  }

  fields() {
    return [];
  }

  actions() {
    return [];
  }

  getFields() {
    if (this._fields === null) {
      this._fields = this.fields();
    }
    return this._fields;
  }

  getActions() {
    if (this._actions === null) {
      this._actions = this.actions();
    }
    return this._actions;
  }

  getErrors() {
    return this._errors;
  }

  getField(field) {
    let fields = this.getFields();

    for (const part of field.split('.')) {
      for (const field of fields) {
        if (field.key === part) {
          fields = field;
          break;
        }
      }
    }
    return fields;
  }

  getValue(field) {
    const root = this.getField(field);

    if (root.value !== undefined) return root.value;
    return this.getValueRecursive(root);
  }

  getValueRecursive(root) {
    const value = {};

    for (const field of root.fields) {
      if (field.value === undefined) {
        value[field.key] = this.getValueRecursive(field.fields);
      } else {
        value[field.key] = field.value;
      }
    }
    return value;
  }

  resetErrors() {
    for (const error of this.getErrors()) {
      const field = this.getField(error.field);

      field.classes.splice(field.classes.indexOf('error'), 1);
    }
    this.getErrors().splice(0, this.getErrors().length);
  }

  hasError() {
    return this.getErrors().length !== 0;
  }

  setError(field, message) {
    this.getField(field).classes.push('error');
    this.getErrors().push({ field, message });
  }

  handleSubmit(builder, view, action) {
    this.resetErrors();

    if (Array.isArray(action.validates)) {
      for (const validate of action.validates) {
        validate.call(this, builder, view, action);
      }
    }

    if (!this.hasError()) {
      if (Array.isArray(action.submits)) {
        for (const submit of action.submits) {
          submit.call(this, builder, view, action);
        }
      }
    }
  }

}
