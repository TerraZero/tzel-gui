'use strict';

const Path = use('core/Path');

module.exports = class CompileListener {

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
