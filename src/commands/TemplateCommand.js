'use strict';

const pug = require('pug');

const Command = use('cli/Command');
const Items = use('core/data/Items');

/**
 * @Command
 */
module.exports = class TemplateCommand extends Command.class {

  /**
   * @Inject('manager.template')
   * @Inject('manager.event')
   */
  inject(manager, events) {
    this._manager = manager;
    this._events = events;
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
    this._sources = this._manager.getSources();
  }

  eClear() {
    this.io().h1('Clear templates');
    this.io().fsClearDir(this._manager.getCompileRoot());
    this.io().fsClearDir(this._manager.getTemplateRoot());
  }

  eLoad() {
    this.io().h1('Load templates');
    const compileRoot = this._manager.getCompileRoot();

    for (const mod in this._sources) {
      const mTpls = boot.mod(mod).path('templates');

      for (const type in this._sources[mod]) {
        for (const index in this._sources[mod][type]) {
          const file = this._sources[mod][type][index].file;
          const name = this._sources[mod][type][index].name;

          this.io().fsCopy(file, compileRoot.join(name));
        }
      }
    }
  }

  eCompile() {
    this.io().h1('Compile templates');
    const compile = this._manager.getCompileRoot();
    const target = this._manager.getTemplateRoot();

    for (const mod in this._sources) {
      for (const index in this._sources[mod].tpl) {
        const file = this._sources[mod].tpl[index];
        const source = compile.join(file.name);
        let content = this.io().fsRead(source);
        const includes = new Items();

        this._events.fire('gui', 'tpl.compile.includes', {
          includes: includes,
          content: content,
          source: source,
          file: file,
          mod: mod,
        });

        if (includes.length()) {
          content = 'include ' + includes.items().join('.mixin.pug\ninclude ') + '.mixin.pug\n' + content;
        }

        const compiled = pug.compileClient(content, {
          filename: source.norm(),
          name: 'template',
        }) + '\nmodule.exports = template;\n';

        let name = file.name.substring(0, file.name.length - 3) + 'js';

        this.io().fsWrite(target.join(name), compiled);
      }
    }
  }

}
