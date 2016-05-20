import routes  from './unidade.routes'

import storage from './unidade.storage'
import api     from './unidade.api'

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
