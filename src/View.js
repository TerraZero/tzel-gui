'use strict';

const Vue = require('./../node_modules/vue/dist/vue.min.js');

const Template = use('gui/Template');

module.exports = class View {

  constructor() {
    this._component = null;
    this._data = this.data();
  }

  component() {
    if (this._component === null) {
      const config = {
        template: this.createTemplate(),
        data: this.createData.bind(this),
      };

      const methods = this.methods();
      if (methods !== null) {
        config.methods = methods;
      }

      const computed = this.computed();
      if (computed !== null) {
        config.computed = computed;
      }

      this._component = Vue.extend(config);
    }
    return this._component;
  }

  mount(selector) {
    return new (this.component())().$mount(selector);
  }

  createData() {
    return this._data;
  }

  tpl() {
    return null;
  }

  createTemplate() {
    return new Template(this.tpl()).render();
  }

  data() {
    return {};
  }

  methods() {
    return null;
  }

  computed() {
    return null;
  }

}
