'use strict';

const Vue = require('./../../node_modules/vue/dist/vue.min.js');
const Template = use('gui/Template');
const Entity = use('gui/Entity');

module.exports = class BootListener {

  /**
   * @Inject('manager.template')
   * @Inject('gui')
   * @Inject('window')
   */
  inject(tpls, gui, window) {
    this._tpls = tpls;
    this._gui = gui;
    this._window = window;
  }

  /**
   * @Listener('core.boot')
   */
  boot(event) {
    const t = new Template('ui.test');

    const Comp = Vue.extend({
      props: ['entity'],
      template: t.render(),
    });

    //this._gui.append('.boot.frame', t.render());

    class Unit1 extends Entity.class {

      init() {
        this._data.name = 'Unit 1';
        this._data.type = 'Nahkampf';
        this._data.panzer = 'Schwer';
        this._data.img = 'http://downloadicons.net/sites/default/files/tank-icon-46085.png';

        this._data.props = [];
        this._data.props.push({
          name: 'Kampf',
          items: [
            { name: 'Angriff', value: '200' },
            { name: 'Verteidigung', value: '300' },
            { name: 'Gelände', value: '2' },
            { name: 'Agilität', value: '100' },
            { name: 'Entfernung', value: '1/1' },
          ],
        });
        this._data.props.push({
          name: 'Verteidigung',
          items: [
            { name: 'Angriff', value: '20' },
            { name: 'Verteidigung', value: '30' },
            { name: 'Gelände', value: '20' },
            { name: 'Agilität', value: '10' },
            { name: 'Entfernung', value: '1/1' },
          ],
        });

        this._data.skills = [];
        this._data.skills.push({ value: 'Kann weit gucken' });
        this._data.skills.push({ value: 'Gut gegen Unit 2' });
        this._data.skills.push({ value: 'Schlecht im Wald' });
        this._data.skills.push({ value: 'Kann schwimmen' });
      }

    }

    class Unit2 extends Entity.class {

      init() {
        this._data.name = 'Unit 2';
        this._data.type = 'Fernkampf';
        this._data.panzer = 'Leicht';
        this._data.img = 'https://d30y9cdsu7xlg0.cloudfront.net/png/11879-200.png';

        this._data.props = [];
        this._data.props.push({
          name: 'Kampf',
          items: [
            { name: 'Angriff', value: '350' },
            { name: 'Verteidigung', value: '100' },
            { name: 'Gelände', value: '5' },
            { name: 'Agilität', value: '20' },
            { name: 'Entfernung', value: '1/10' },
          ],
        });
        this._data.props.push({
          name: 'Verteidigung',
          items: [
            { name: 'Angriff', value: '20' },
            { name: 'Verteidigung', value: '30' },
            { name: 'Gelände', value: '20' },
            { name: 'Agilität', value: '10' },
            { name: 'Entfernung', value: '1/5' },
          ],
        });

        this._data.skills = [];
        this._data.skills.push({ value: 'Sieht auch in Wäldern' });
        this._data.skills.push({ value: 'Gut gegen Unit 1' });
        this._data.skills.push({ value: 'Gut in Gebirgen' });
        this._data.skills.push({ value: 'Kann nicht schwimmen' });
      }

    }

    const u1 = new Unit1();
    const u2 = new Unit2();

    var vm = new Comp({

      propsData: {
        entity: u1.data(),
      },

      methods: {

        toU1: function () {
          this.entity = u1.data();
        },

        toU2: function () {
          this.entity = u2.data();
        },

        data: function () {
          console.log(this.entity);
        },

      },

    });

    //this._gui.append('.boot.frame', t.render());
    vm.$mount('.boot.frame');

    /*
    new Vue({
      el: '#test',
      data: {
        entity: u1.data(),
      },
      methods: {

        toU1: function () {
          this.entity = u1.data();
        },

        toU2: function () {
          this.entity = u2.data();
        },

        data: function () {
          console.log(this.entity);
        },

      },
    });
    */

    // this._window.setStatus('borderscreen');
  }

}
