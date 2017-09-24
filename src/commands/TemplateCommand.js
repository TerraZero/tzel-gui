'use strict';

const Command = use('cli/Command');
const Path = require('path');

/**
 * @Command
 */
module.exports = class TemplateCommand extends Command.class {

  /**
   * @Inject('manager.template')
   */
  inject(manager) {
    this._manager = manager;
  }

  command() {
    return 'template <command>';
  }

  aliases() {
    return ['tpl'];
  }

  build(yargs) {
    yargs.choices('command', ['clear', 'load', 'pre-compile', 'compile', 'run']);
  }

  execute(argv) {
    this.ensure();
    switch (argv.command) {
      case 'clear':
        this.eClear(argv);
        break;
      case 'load':
        this.eLoad(argv);
        break;
      case 'pre-compile':
        this.ePreCompile(argv);
        break;
      case 'compile':
        this.eCompile(argv);
        break;
      case 'run':
        this.eClear(argv);
        this.eLoad(argv);
        this.ePreCompile(argv);
        this.eCompile(argv);
        break;
    }
  }

  ensure(argv) {
    this.io().fsMkDirs([boot.setting('path.tmp'), 'compile']);
    this.io().fsMkDirs(boot.setting('path.tpls'));
    this._data = this._manager.data();
  }

  eClear() {
    this.io().h1('Clear templates');
  }

  eLoad() {
    this.io().h1('Load templates');

    for (const mod in this._data) {
      const mTpls = boot.mod(mod).path('templates');

      for (const index in this._data[mod]) {
        const file = this._data[mod][index];
        const name = this._newTplName(mTpls, file);

        this.io().fsCopy(this.io().rel(file), [boot.setting('path.tmp'), 'compile', name]);
      }
    }
  }

  ePreCompile() {
    this.io().h1('Merge and add includes');
  }

  eCompile() {
    this.io().h1('Compile templates');
  }

  _newTplName(path, file) {
    const part = Path.normalize(file.substring(path.length + 1));
    const parts = part.split(Path.sep);
    return parts.join('.');
  }

}
