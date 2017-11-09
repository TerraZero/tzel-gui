'use strict';

const remote = require('electron').remote;

module.exports = class Window {

  static getWindow() {
    return remote.getCurrentWindow();
  }

  static setFullscreen(flag) {
    this.getWindow().setFullScreen(flag);
  }

  static setSize(dimension) {
    this.getWindow().setSize(dimension[0], dimension[1]);
  }

  static getSize() {
    return this.getWindow().getSize();
  }

  static setBorderScreen(flag) {
    this.getWindow().set
  }

  static setTitle(title) {
    this._title = title;
    this.getWindow().setTitle(title);
  }

  static getTitle() {
    return this.getWindow().getTitle();
  }

  static setStatus(status) {
    if (this._title === undefined) {
      this._title = this.getTitle();
    }

    this.getWindow().setTitle(this._title + ' [' + status + ']');
  }

}
