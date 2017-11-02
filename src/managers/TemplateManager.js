'use strict';

const Glob = require('glob');

const Path = use('core/Path');

/**
 * @Service('manager.template')
 */
module.exports = class TemplateManager {

  constructor() {
    this._data = null;
  }

  data() {
    if (this._data === null) {
      this._data = {};
      const mods = boot.getMods();

      for (const index in mods) {
        if (mods[index].hasPath('templates')) {
          const key = mods[index].key();
          const path = mods[index].path('templates');

          this._data[key] = {
            tpl: [],
            mixin: [],
          };

          for (const type in this._data[key]) {
            const files = Glob.sync('**/*.' + type + '.pug', {
              cwd: path,
              absolute: true,
            });

            for (const f in files) {
              this._data[key][type].push({
                file: files[f],
                name: this.getTplName(path, files[f]),
              });
            }
          }
        }
      }
    }
    return this._data;
  }

  getTplName(path, file) {
    const part = Path.normalize(file.substring(path.length + 1));
    const parts = part.split(Path.sep);

    return parts.join('.');
  }

  getCompileRoot() {
    return Path.create([boot.setting('path.tmp'), 'compile']);
  }

  getTemplateRoot() {
    return Path.create([boot.setting('path.tpls')]);
  }

}
