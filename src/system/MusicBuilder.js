'use strict';

const View = use('gui/View');

/**
 * @Service('system.music')
 * @Mount(
 *   value='system-music',
 *   screen='root'
 * )
 */
module.exports = class MusicBuilder extends View.class {

  tpl() {
    return 'system.music';
  }

  data() {
    return {
      state: {
        open: false,
        full: false,
        teaser: false,
      },
      video: 'https://www.youtube.com/embed/uQes2Bh9A3w',
    };
  }

  toggleOpen() {
    this._data.state.teaser = false;
    this._data.state.open = !this._data.state.open;
    if (!this._data.state.open) {
      this._data.state.full = false;
    }
  }

  toggleFull() {
    this._data.state.teaser = false;
    this._data.state.full = !this._data.state.full;
  }

  openTeaser(event) {
    if (!this._data.state.open) {
      this._data.state.teaser = true;
    }
  }

  closeTeaser() {
    this._data.state.teaser = false;
  }

  methods() {
    return {
      toggleOpen: this.toggleOpen.bind(this),
      toggleFull: this.toggleFull.bind(this),
      openTeaser: this.openTeaser.bind(this),
      closeTeaser: this.closeTeaser.bind(this),
    };
  }

}
