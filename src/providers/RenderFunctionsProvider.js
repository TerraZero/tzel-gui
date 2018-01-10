'use strict';

const Provider = use('core/Provider');
const RenderFunction = use('gui/annotations/RenderFunction');

/**
 * @Provider('provider.render.functions')
 */
module.exports = class RenderFunctionProvider extends Provider.class {

  parsing(manifest, data) {
    const renders = manifest.getFromAnnotations(RenderFunction);

    if (renders.length) {
      const funcs = [];

      for (const render of renders) {
        funcs.push({
          name: render.fields.value || render.props.target,
          target: render.props.target,
        });
      }
      manifest.register(this, 'render.functions', {
        key: manifest.getKey(),
        funcs: funcs,
      });
    }
  }

}
