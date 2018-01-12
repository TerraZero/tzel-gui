'use strict';

const Annotation = use('core/reflect/Annotation');

module.exports = class Mount extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
      screen: null,
      service: null,
    };
  }

};
