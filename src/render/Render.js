'use strict';

module.exports = class Render {

  /**
   * @RenderFunction
   */
  render(info, item, isChild = false) {
    if (typeof item === 'string') return item;

    if (item === undefined || item === null) return '';
    if (item === true) return 'true';
    if (item === false) return 'false';

    if (Array.isArray(item)) {
      const data = [];

      for (const child of item) {
        data.push(this.render(info, child, true));
      }
      return data.join('');
    }

    if (typeof item.render === 'function') {
      return this.render(info, item.render(), true);
    }

    if (typeof item === 'function') {
      return this.render(info, item(), true);
    }

    return item + '';
  }

}
