import routes  from './representante.routes'

import storage from './representante.storage'
import api     from './representante.api'

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
