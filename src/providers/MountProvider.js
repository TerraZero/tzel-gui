'use strict';

const Provider = use('core/Provider');
const Mount = use('gui/annotations/Mount');

/**
 * @Provider('provider.mount')
 */
module.exports = class MountProvider extends Provider.class {

  parsing(manifest, data) {
    const mounts = manifest.getFromAnnotations(Mount);

    if (mounts.length) {
      manifest.addAlias(mounts[0].fields.service);
      manifest.setScope('all');
      manifest.register(this, mounts[0].fields.screen, {
        key: manifest.getKey(),
        value: mounts[0].fields.value,
        service: mounts[0].fields.service,
      });
    }
  }

}
