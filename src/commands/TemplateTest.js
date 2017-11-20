'use strict';

const Command = use('cli/Command');
const Textfield = use('gui/forms/Textfield');

/**
 * @Command
 */
module.exports = class TemplateTest extends Command.class {

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    this._manager = manager;
  }

  command() {
    return 'tpltest';
  }

  description() {
    return 'Test';
  }

  execute(argv) {
    const t = new Textfield('test');

    log(t.el('input'));
  }

}
