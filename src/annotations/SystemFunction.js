'use strict';

const Annotation = use('core/reflect/Annotation');

module.exports = class SystemFunction extends Annotation.class {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
    };
  }

};
