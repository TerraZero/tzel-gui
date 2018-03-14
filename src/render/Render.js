'use strict';

const jq = require('jquery');
const Template = use('gui/Template');

module.exports = class Render {

  /**
   * @RenderFunction
   */
  render(info, item, attr, isChild = false) {
    if (typeof item === 'string') return item;
    if (item instanceof jq) return item;

    if (item === undefined || item === null) return '';
    if (item === true) return 'true';
    if (item === false) return 'false';

    if (Array.isArray(item)) {
      const data = [];

      for (const child of item) {
        data.push(this.render(info, child, attr, true));
      }
      return data.join('');
    }

    if (typeof item.render === 'function') {
      return this.render(info, item.render(attr), attr, true);
    }

    if (typeof item.tpl === 'string') {
      const template = new Template(item.tpl);

      for (const name in item) {
        if (name === 'tpl') continue;
        template.set(name, item[name]);
      }
      return this.render(info, template.render(attr), attr, true);
    }

    if (typeof item === 'function') {
      return this.render(info, item(attr), attr, true);
    }

    return item + '';
  }

  /**
   * @RenderFunction
   */
  log() {
    console.log.apply(console, arguments);
  }

}
