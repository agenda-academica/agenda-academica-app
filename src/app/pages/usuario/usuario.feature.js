import routes from './usuario.routes'

import auth   from './usuario.auth'
import api    from './usuario.api'

import login  from './login/login.package'
import create from './create/create.package'
import update from './update/update.package'

export default {
  config: {
    routes,
  },

  service: {
    auth,
    api,
  },

  package: {
    login,
    create,
    update,
  },
}
