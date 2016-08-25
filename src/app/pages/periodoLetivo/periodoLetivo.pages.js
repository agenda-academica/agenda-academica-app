import angular      from 'angular'
import periodoLetivo from './periodoLetivo.feature'

export default angular.module('app.pages.periodoLetivo', [])

  ////
  // Configs
  ////
  .config(periodoLetivo.config.routes)

  ////
  // Services
  ////
  .service('periodoLetivo'        , periodoLetivo.service.api)
  .service('periodoLetivoStorage' , periodoLetivo.service.storage)

  ////
  // Create
  ////
  .component('periodoLetivoCreateForm' , periodoLetivo.package.create.form)
  .component('periodoLetivoCreate'     , periodoLetivo.package.create.create)

  ////
  // Read
  ////
  .component('periodoLetivoReadAddFab' , periodoLetivo.package.read.addFab)
  .component('periodoLetivoReadFilter' , periodoLetivo.package.read.filter)
  .component('periodoLetivoReadForm'   , periodoLetivo.package.read.form)
  .component('periodoLetivoRead'       , periodoLetivo.package.read.read)

  ////
  // Update
  ////
  .component('periodoLetivoUpdateForm' , periodoLetivo.package.update.form)
  .component('periodoLetivoUpdate'     , periodoLetivo.package.update.update)
