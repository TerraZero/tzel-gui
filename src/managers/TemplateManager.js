'use strict';

const Glob = require('glob');

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
          this._data[mods[index].key()] = {};

          this._data[mods[index].key()].tpls = Glob.sync('**/*.tpl.pug', {
            cwd: mods[index].path('templates'),
            absolute: true,
          });

          this._data[mods[index].key()].mixins = Glob.sync('**/*.mixin.pug', {
            cwd: mods[index].path('templates'),
            absolute: true,
          });
        }
      }
    }
    return this._data;
  }

}
