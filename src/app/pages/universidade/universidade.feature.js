import routes  from './universidade.routes'

import storage from './universidade.storage'
import api     from './universidade.api'

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
