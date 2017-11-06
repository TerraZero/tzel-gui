'use strict';

module.exports = class CompileListener {

  /**
   * @Listener('gui.tpl.compile.includes')
   */
  includes(event) {
    const includes = event.get('includes');

    includes.first('base.core');
  }

}
