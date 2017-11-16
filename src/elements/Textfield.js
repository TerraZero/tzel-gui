'use strict';

const Element = use('gui/elements/Element');

module.exports = class Textfield extends Element.class {

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    super.inject(manager);
  }

  tpl() {
    return 'forms.inputs.textfield';
  }

}
