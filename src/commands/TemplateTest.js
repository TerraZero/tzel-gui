'use strict';

const Command = use('cli/Command');
const Template = use('gui/Template');

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
    const tpl = this._manager.get('frame.screen');

    log(tpl.render());
  }

}
