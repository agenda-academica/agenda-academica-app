import routes  from './evento.routes'

import storage from './evento.storage'
import api     from './evento.api'

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
