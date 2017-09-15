'use strict';

const Command = use('cli/Command');

/**
 * @Command
 */
module.exports = class TemplateCommand extends Command.class {

  command() {
    return 'template <command>';
  }

  aliases() {
    return ['tpl'];
  }

  build(yargs) {
    yargs.choices('command', ['compile', 'run']);
  }

  execute(argv) {
    log(argv);
  }

}
