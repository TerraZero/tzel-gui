'use strict';

const Annotation = use('core/reflect/Annotation');

module.exports = class SystemFunction extends Annotation.class {

  static get targets() { return [this.METHOD] }

  static get tag() { return true; }

  static get serve() { return false; }

  fields() {
    return {
      value: null,
    };
  }

};
