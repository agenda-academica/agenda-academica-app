import angular      from 'angular'
import representante from './representante.feature'

export default angular.module('app.pages.representante', [])

  ////
  // Configs
  ////
  .config(representante.config.routes)

  ////
  // Services
  ////
  .service('representante'        , representante.service.api)
  .service('representanteStorage' , representante.service.storage)

  ////
  // Create
  ////
  .component('representanteCreateForm' , representante.package.create.form)
  .component('representanteCreate'     , representante.package.create.create)

  ////
  // Read
  ////
  .component('representanteReadAddFab' , representante.package.read.addFab)
  .component('representanteReadFilter' , representante.package.read.filter)
  .component('representanteReadForm'   , representante.package.read.form)
  .component('representanteRead'       , representante.package.read.read)

  ////
  // Update
  ////
  .component('representanteUpdateForm' , representante.package.update.form)
  .component('representanteUpdate'     , representante.package.update.update)
