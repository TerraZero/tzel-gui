'use strict';

module.exports = class DebugFunctions {

  constructor() {
    this._active = false;
  }

  /**
   * @Inject('window')
   */
  inject(window) {
    this._window = window;
  }

  /**
   * @SystemFunction('d')
   */
  activateDebug(event, key, sys) {
    if (event.ctrlKey && !this._active) {
      this._active = true;
      event.preventDefault();
      event.stopPropagation();

      sys.notice('Action', 0);
    }
  }

  /**
   * @SystemFunction
   */
  deactivateDebug(event, key, sys) {
    if (this._active) {
      this._active = false;
      event.preventDefault();
      event.stopPropagation();

      sys.error('Unknown action: ' + key);
    }
  }

  /**
   * @SystemFunction('d')
   */
  openDevTools(event, key, sys) {
    if (this._active) {
      this._active = false;
      event.preventDefault();
      event.stopPropagation();

      this._window.openDevTools();
      sys.notice('Open Dev Tools');
    }
  }

  /**
   * @SystemFunction('b')
   */
  switchBorderscreen(event, key, sys) {
    if (this._active) {
      this._active = false;
      event.preventDefault();
      event.stopPropagation();

      if (this._window.getStatus() === 'borderscreen') {
        sys.warning('Already in borderscreen');
      } else {
        this._window.setStatus('borderscreen');
        sys.notice('Switch to borderscreen');
      }
    }
  }

  /**
   * @SystemFunction('f')
   */
  switchFullscreen(event, key, sys) {
    if (this._active) {
      this._active = false;
      event.preventDefault();
      event.stopPropagation();

      if (this._window.getStatus() === 'fullscreen') {
        sys.warning('Already in fullscreen');
      } else {
        this._window.setStatus('fullscreen');
        sys.notice('Switch to fullscreen');
      }
    }
  }

  /**
   * @SystemFunction('n')
   */
  switchNormal(event, key, sys) {
    if (this._active) {
      this._active = false;
      event.preventDefault();
      event.stopPropagation();

      if (this._window.getStatus() === 'normal') {
        sys.warning('Already in normal');
      } else {
        this._window.setStatus('normal');
        sys.notice('Switch to normal');
      }
    }
  }

}
