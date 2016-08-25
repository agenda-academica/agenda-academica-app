import routes  from './periodoLetivo.routes'

import storage from './periodoLetivo.storage'
import api     from './periodoLetivo.api'

import create  from './create/create.package'
import read    from './read/read.package'
import update  from './update/update.package'

export default {
  config: {
    routes,
  },

  service: {
    storage,
    api,
  },

  package: {
    create,
    read,
    update,
  },
}
