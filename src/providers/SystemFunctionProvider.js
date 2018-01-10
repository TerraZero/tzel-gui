'use strict';

const Provider = use('core/Provider');
const SystemFunction = use('gui/annotations/SystemFunction');

/**
 * @Provider('provider.system.functions')
 */
module.exports = class SystemFunctionProvider extends Provider.class {

  parsing(manifest, data) {
    const functions = manifest.getFromAnnotations(SystemFunction);

    if (functions.length) {
      for (const func of functions) {
        manifest.register(this, func.fields.value, {
          key: manifest.getKey(),
          target: func.props.target,
        });
      }
    }
  }

}
