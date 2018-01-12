'use strict';

const Glob = require('glob');

const Path = use('core/Path');
const Template = use('gui/Template');
const Manifest = use('core/reflect/Manifest');
const RenderFunction = use('gui/annotations/RenderFunction');

/**
 * @Service('manager.template')
 */
module.exports = class TemplateManager {

  constructor() {
    this._sources = null;
    this._renderFunctions = null;
    this._ids = {};
  }

  getRenderFunctions() {
    if (this._renderFunctions === null) {
      this._renderFunctions = {};
      const register = Manifest.getRegister('provider.render.functions', 'render.functions');

      for (const item of register) {
        const object = use(item.key);

        for (const func of item.funcs) {
          this._renderFunctions[func.name] = object[func.target].bind(object);
        }
      }
    }
    return this._renderFunctions;
  }

  getSources(reset = false) {
    if (this._sources === null || reset) {
      this._sources = {};
      const mods = boot.getMods();

      for (const index in mods) {
        if (mods[index].hasPath('components')) {
          const key = mods[index].key();
          const path = mods[index].path('components');

          this._sources[key] = {
            tpl: [],
            mixin: [],
          };

          for (const type in this._sources[key]) {
            const files = Glob.sync('**/*.' + type + '.pug', {
              cwd: path,
              absolute: true,
            });

            for (const f in files) {
              this._sources[key][type].push({
                file: files[f],
                name: this.getTplName(path, files[f]),
              });
            }
          }
        }
      }
    }
    return this._sources;
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

  render(template) {
    return template.tpl()(template.getArgs());
  }

  getID(name = 'id') {
    let number = this._ids[name] || 0;
    const id = name + '-' + number++;

    this._ids[name] = number;
    return id;
  }

}
