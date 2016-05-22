import routes  from './curso.routes'

import storage from './curso.storage'
import api     from './curso.api'

import create  from './create/create.package'
import read    from './read/read.package'
import update  from './update/update.package'

export default {
  ////
  // Configs
  ////
  routes,

  ////
  // Services
  ////
  storage,
  api,

  ////
  // Components
  ////
  create,
  read,
  update,
}
