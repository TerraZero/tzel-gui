'use strict';

const remote = require('electron').remote;

/**
 * @Service('window')
 */
module.exports = class Window {

  constructor() {
    this._window = null;

    this._displays = null;
    this._display = null;

    this._status = 'normal';
    this._saveBounds = null;
  }

  getWindow() {
    if (this._window === null) {
      this._window = remote.getCurrentWindow();
    }
    return this._window;
  }

  setDisplay(index = null) {
    if (index === null || index === this._display) return;

    const current = this.getDisplay();
    const target = this.getDisplay(index);
    let bounds = this.getBounds();

    if (this.getStatus() === 'borderscreen') {
      bounds = target.bounds;
    } else {
      bounds.x = bounds.x - current.bounds.x + target.bounds.x;
      bounds.y = bounds.y - current.bounds.y + target.bounds.y;
    }

    this.setBounds(bounds);
    this._display = index;
  }

  getDisplay(index = null) {
    const displays = this.getDisplays();

    if (index === null) index = this._display;
    return displays[index].display;
  }

  getDisplays() {
    if (this._displays === null) {
      const displays = remote.screen.getAllDisplays();
      const primary = remote.screen.getPrimaryDisplay();
      const data = [];

      for (const index in displays) {
        const display = displays[index];
        const name = ['Screen', (parseInt(index) + 1) + '.'];

        if (display.id === primary.id) {
          this._display = parseInt(index);
          name.push('(Primary)');
        }

        name.push('[' + display.bounds.width + ' x ' + display.bounds.height + ']');

        data.push({
          name: name.join(' '),
          display: display,
        });
      }
      this._displays = data;
    }
    return this._displays;
  }

  setStatus(status) {
    const current = this.getStatus();

    if (status === current) return;

    // clean up
    switch (current) {
      case 'normal':
        this._saveBounds = this.getBounds();
        break;
      case 'fullscreen':
        this.getWindow().setFullScreen(false);
        break;
      case 'borderscreen':
        this.getWindow().setAlwaysOnTop(false);
        break;
    }

    switch (status) {
      case 'fullscreen':
        this.getWindow().setFullScreen(true);
        break;
      case 'borderscreen':
        this.setBounds(this.getDisplayBounds());
        this.getWindow().setAlwaysOnTop(true);
        break;
      case 'normal':
        this.setBounds(this._saveBounds);
        break;
      default:
        throw new TypeError('The status "' + status + '" is not known, please use one of "normal, fullscreen, borderscreen".');
    }
    this._status = status;
  }

  getStatus() {
    return this._status;
  }

  getBounds() {
    return this.getWindow().getBounds();
  }

  setBounds(bounds, animate = false) {
    this.getWindow().setBounds(bounds, false);
  }

  getDisplayBounds(index = null) {
    return this.getDisplay(index).bounds;
  }

  openDevTool() {
    this.getWindow().webContents.openDevTools();
    return this;
  }

}
