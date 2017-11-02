'use strict';

const Command = use('cli/Command');

/**
 * @Command
 */
module.exports = class TestCommand extends Command.class {

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    this._manager = manager;
  }

  command() {
    return 'testtpl';
  }

  execute(argv) {
    log(this._manager.data());
  }

}
