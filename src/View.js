'use strict';

const Vue = require('./../node_modules/vue/dist/vue.min.js');
Vue.config.silent = false;
Vue.config.devtools = true;

const Template = use('gui/Template');

module.exports = class View {

  static vue() {
    return Vue;
  }

  constructor() {
    this._component = null;
    this._data = this.data();
    this._vm = null;
  }

  component() {
    if (this._component === null) {
      const template = new Template(this.tpl()).setArgs(this.args());

      this.createTemplate(template);
      const config = {
        template: template.render(),
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

      const locals = this.localComponents();
      if (locals !== null) {
        config.components = {};
        for (const local of locals) {
          local.template = new Template(local.template).render();
          config.components[local.name] = local;
        }
      }

      this._component = Vue.extend(config);
    }
    return this._component;
  }

  localComponents() {
    return null;
  }

  mount(selector) {
    this._vm = new (this.component())().$mount(selector);
    return this;
  }

  createData() {
    return this._data;
  }

  tpl() {
    return null;
  }

  args() {
    return {};
  }

  createTemplate(template) {

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

  tick(func) {
    Vue.nextTick(func, this);
    return this;
  }

}
