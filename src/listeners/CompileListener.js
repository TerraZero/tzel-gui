'use strict';

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
    const file = event.get('file');

    if (file.name === 'base.tpls.page.tpl.pug') {
      const options = event.get('options');

      options.compile = 'html';
    }
  }

}
