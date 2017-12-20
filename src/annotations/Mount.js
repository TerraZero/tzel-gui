'use strict';

const Annotation = use('core/reflect/Annotation');

module.exports = class Mount extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  static get tag() { return true; }

  static get serve() { return false; }

  fields() {
    return {
      value: null,
      screen: null,
    };
  }

};
