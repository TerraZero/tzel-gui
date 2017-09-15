'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let window = null;

module.exports = class Window {

  constructor(configs = {}) {
    this._configs = configs;
    this._window = null;
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

  window() {
    return this._window;
  }

  open() {
    if (this._window === null) {
      app.on('ready', this.doOpen.bind(this));
    }
  }

  doOpen() {
    this._window = new BrowserWindow(this.configs());
  }

  close() {
    app.on('ready', this.doClose.bind(this));
  }

  doClose() {
    this._window.close();
    this._window = null;
  }

}
