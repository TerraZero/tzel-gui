'use strict';

const remote = require('electron').remote;

/**
 * @Service('window')
 */
module.exports = class Window {

  constructor() {
    this._window = null;
    this._display = null;

    this._isBorderScreen = false;
    this._saveBounds = null;
  }

  getWindow() {
    if (this._window === null) {
      this._window = remote.getCurrentWindow();
    }
    return this._window;
  }

  getDisplay() {
    if (this._display === null) {
      this._display = remote.screen.getPrimaryDisplay();
    }
    return this._display;
  }

  setFullScreen(flag = true) {
    this.getWindow().setFullScreen(flag);
  }

  isFullScreen() {
    return this.getWindow().isFullScreen();
  }

  setBorderScreen(flag = true) {
    if (this._isBorderScreen !== flag) {
      if (flag) {
        this._saveBounds = this.getSize();
        this.setSize(this.getDisplaySize());
        this.getWindow().setAlwaysOnTop(true);
        this.getWindow().center();
      } else {
        this.setSize(this._saveBounds);
        this.getWindow().setAlwaysOnTop(false);
        this.getWindow().center();
      }
      this._isBorderScreen = flag;
    }
  }

  isBorderScreen() {
    return this._isBorderScreen;
  }

  getSize() {
    const size = this.getWindow().getSize();

    return {
      width: size[0],
      height: size[1],
    };
  }

  setSize(dimension) {
    this.getWindow().setSize(dimension.width, dimension.height);
  }

  getDisplaySize() {
    return this.getDisplay().workAreaSize;
  }

}
