import routes  from './disciplina.routes'

import storage from './disciplina.storage'
import api     from './disciplina.api'

import create  from './create/create.package'
import read    from './read/read.package'
// import update  from './update/update.package'

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
    // update,
  },
}
