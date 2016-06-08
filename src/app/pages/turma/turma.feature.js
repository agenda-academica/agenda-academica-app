/*
Classe centralizadora de todos os JS de turma
*/

import routes  from './turma.routes'

import storage from './turma.storage'
import api     from './turma.api'

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
