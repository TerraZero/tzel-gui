'use strict';

const jq = require('jQuery');

const Template = use('gui/Template');
const Entity = use('gui/Entity');
const View = use('gui/View');

const LoginForm = use('gui/forms/LoginForm');
const FormBuilder = use('gui/forms/FormBuilder');

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
   * @Listener('core.boot.window')
   */
  boot(event) {
    jq('.boot.frame').append('<div class="mount-system-messages"></div>');
    const sys = use('system.messages').mount('.mount-system-messages');
    const window = this._window;

    let action = null;

    jq('body').keydown(function (e) {
      let after = null;

      if (action) {
        e.stopPropagation();
        e.preventDefault();

        const status = window.getStatus();

        switch (e.key) {
          case 'd':
            window.openDevTool();
            sys.notice('Open: DevTool');
            break;
          case 'b':
            if (status === 'borderscreen') {
              sys.warning('Already in borderscreen');
            } else {
              window.setStatus('borderscreen');
              sys.notice('window:borderscreen');
            }
            break;
          case 'f':
            if (status === 'fullscreen') {
              sys.warning('Already in fullscreen');
            } else {
              window.setStatus('fullscreen');
              sys.notice('window:fullscreen');
            }
            break;
          case 'n':
            if (status === 'normal') {
              sys.warning('Already in normal');
            } else {
              window.setStatus('normal');
              sys.notice('window:normal');
            }
            break;
          default:
            sys.error('Unknown action "' + e.key + '"');
            break;
        }
      }
      if (!action && e.ctrlKey && e.key == 'd') {
        action = sys.notice('Action', 0);
        return;
      }
      if (action) {
        action = null;
      }
    });


    jq('.boot.frame').append('<div class="view-login-form"></div>');

    new FormBuilder().mount('.view-login-form').setForm(new LoginForm());
    return;
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

        this._data.actions = [];
        this._data.actions.push({
          name: 'First 1',
          key: 'coo',
        });
        this._data.actions.push({
          name: 'Second 1',
          key: 'coo-2',
        });
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

        this._data.actions = [];
        this._data.actions.push({
          name: 'First 2',
          key: 'cool',
        });
        this._data.actions.push({
          name: 'Second 2',
          key: 'cool-2',
        });
      }

    }

    const u1 = new Unit1();
    const u2 = new Unit2();

    class Test extends View.class {

      tpl() {
        return 'ui.test';
      }

      data() {
        return {
          entity: u1.data(),
        }
      }

      methods() {
        return {

          toU1: function () {
            this.entity = u1.data();
          },

          toU2: function () {
            this.entity = u2.data();
          },

        };
      }

    }

    //new Test().mount('.boot.frame');
    use('window').setStatus('borderscreen');
  }

}
