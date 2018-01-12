'use strict';

const View = use('gui/View');

/**
 * @Mount(
 *   value='system-messages',
 *   screen='root',
 *   service='system.messages'
 * )
 */
module.exports = class SystemMessageBuilder extends View.class {

  constructor() {
    super();
    this._id = 0;
    this._messages = [];
  }

  data() {
    return {
      message: null,
    };
  }

  tpl() {
    return 'system.messages';
  }

  create(message, type = 'notice', timeout = 2000) {
    return { id: this._id++, message, type, timeout, show: false, hover: false, after: [] };
  }

  addMessage(message) {
    if (this._data.message === null) {
      this._data.message = message;
      this.tick(this.tickShowMessage);
    } else {
      this._messages.push(message);
    }
    if (this._data.message && this._data.message.timeout === 0) {
      this.nextMessage();
    }
    return message;
  }

  message(message, type = 'notice', timeout = 2000) {
    return this.addMessage(this.create(message, type, timeout));
  }

  notice(message, timeout = 2000) {
    return this.message(message, 'notice', timeout);
  }

  warning(message, timeout = 2000) {
    return this.message(message, 'warning', timeout);
  }

  error(message, timeout = 2000) {
    return this.message(message, 'error', timeout);
  }

  nextMessage() {
    if (this._data.message) {
      this._data.message.show = false;
    }
  }

  clearMessage() {
    if (this._messages.length) {
      this._data.message = this._messages.shift();
      this.tick(this.tickShowMessage);
    } else {
      this._data.message = null;
    }
  }

  tickShowMessage() {
    this._data.message.show = true;
    if (this._data.message.timeout > 0) {
      setTimeout(this.nextMessage.bind(this), this._data.message.timeout);
    }
  }

  methods() {
    return {
      nextMessage: this.nextMessage.bind(this),
      clearMessage: this.clearMessage.bind(this),
    };
  }

}
