'use strict';

const electron = require('electron');
const url = require('url');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Path = use('core/Path');

let window = null;

module.exports = class Window {

  static isGUISupport() {
    return app !== undefined;
  }

  constructor(name, configs = {}) {
    this._name = name;
    this._configs = configs;
    this._window = null;
  }

  /**
   * @Inject('manager.event')
   */
  inject(em) {
    this._em = em;
  }

  name() {
    return this._name;
  }

  config(prop, value = null) {
    if (value === null) {
      return this.configs()[prop] || null;
    } else {
      this.configs()[prop] = value;
      return this;
    }
  }

  configs(configs = null) {
    if (configs === null) {
      return this._configs;
    } else {
      this._configs = configs;
      return this;
    }
  }

  load(path) {
    path = Path.create(path);
    this.window().loadURL(url.format({
      pathname: path.norm(),
      protocol: 'file:',
      slashes: true
    }));
    return this;
  }

  window() {
    return this._window;
  }

  open() {
    if (this._window === null) {
      app.on('ready', this.doOpen.bind(this));
    }
    return this;
  }

  doOpen() {
    this._window = new BrowserWindow(this.configs());

    this._em.fire('gui', 'window.open', {
      window: this,
    });
  }

  close() {
    app.on('ready', this.doClose.bind(this));
    return this;
  }

  doClose() {
    this._window.close();
    this._window = null;
    this._em.fire('gui', 'window.close', {
      window: this,
    });
  }

  openTools() {
    this.window().webContents.openDevTools();
  }

  static render() {
    log('ok');
  }

}
