'use strict';

const Path = use('core/Path');

module.exports = class CompileListener {

  /**
   * @Listener('gui.tpl.compile.includes')
   */
  includes(event) {
    const includes = event.get('includes');

    includes.first('base.mixins.core');
  }

  /**
   * @Listener('gui.tpl.compile.alter')
   */
  alter(event) {
    const mod = event.get('mod');
    const file = event.get('file');

    if (file.name === 'base.tpls.page.tpl.pug') {
      const options = event.get('options');

      options.compile = 'html';
    }

    if (mod === 'gui' && file.name.startsWith('root.')) {
      const options = event.get('options');

      options.compile = 'html';
      event.set('target', Path.create('', 'root:'));
      file.name = file.name.substring(5);
    }
  }

  /**
   * @Listener('gulp.config.alter')
   */
  gulp(event) {
    const config = event.get('config');
    const isTaskChange = event.get('isTaskChange');

    if (config.datas.pug !== undefined && isTaskChange('pug')) {
      config.datas.pug.includes.push('base.mixins.core.mixin.pug');
    }
  }

}
