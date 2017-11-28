'use strict';

const Glob = require('glob');

const Path = use('core/Path');
const Template = use('gui/Template');
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
      const datas = boot.getDatas();

      for (const index in datas) {
        if (datas[index].hasTag(RenderFunction.name)) {
          const annots = datas[index].getAnnotation(RenderFunction.name);
          const subject = new (use(datas[index].use()))();

          for (const a in annots) {
            let name = annots[a].data.value;

            if (name === null) {
              name = annots[a].target;
            }
            this._renderFunctions[name] = subject[annots[a].target].bind(subject);
          }
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
    const args = template.args();

    if (!args.rendered) {
      args.rendered = true;
      args.info = args.info || {};
      args.info.template = template;

      args.sys = this.getRenderFunctions();
    }
    return template.tpl()(args);
  }

  getID(name = 'id') {
    let number = this._ids[name] || 0;
    const id = name + '-' + number++;

    this._ids[name] = number;
    return id;
  }

}
