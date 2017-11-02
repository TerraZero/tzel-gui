'use strict';

const pug = require('pug');

const Command = use('cli/Command');

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

  description() {
    return 'Generate template files';
  }

  aliases() {
    return ['tpl'];
  }

  build(yargs) {
    yargs.choices('command', ['clear', 'load', 'compile', 'run']);
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
      case 'compile':
        this.eCompile(argv);
        break;
      case 'run':
        this.eClear(argv);
        this.eLoad(argv);
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

    const Template = use('gui/Template');
    const s = new Template('cool.test');
    log(s.render({ cool: 'super' }));
  }

  eLoad() {
    this.io().h1('Load templates');
    const compileRoot = this._manager.getCompileRoot();

    for (const mod in this._data) {
      const mTpls = boot.mod(mod).path('templates');

      for (const type in this._data[mod]) {
        for (const index in this._data[mod][type]) {
          const file = this._data[mod][type][index].file;
          const name = this._data[mod][type][index].name;

          this.io().fsCopy(file, compileRoot.join(name));
        }
      }
    }
  }

  eCompile() {
    this.io().h1('Compile templates');
    const compile = this._manager.getCompileRoot();
    const target = this._manager.getTemplateRoot();

    for (const mod in this._data) {
      for (const index in this._data[mod].tpl) {
        const file = this._data[mod].tpl[index];
        const source = compile.join(file.name);
        const content = this.io().fsRead(source);

        const compiled = pug.compileClient(content, {
          filename: source.norm(),
        }) + '\nmodule.exports = template;\n';

        let name = file.name.substring(0, file.name.length - 3) + 'js';

        this.io().fsWrite(target.join(name), compiled);
      }
    }
  }

}
