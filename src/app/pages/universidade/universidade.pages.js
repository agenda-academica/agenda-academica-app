import angular      from 'angular'
import universidade from './universidade.feature'

export default angular.module('app.pages.universidade', [])

  ////
  // Configs
  ////
  .config(universidade.config.routes)

  ////
  // Services
  ////
  .service('universidade'        , universidade.service.api)
  .service('universidadeStorage' , universidade.service.storage)

  ////
  // Create
  ////
  .component('universidadeCreateForm' , universidade.package.create.form)
  .component('universidadeCreate'     , universidade.package.create.create)

  ////
  // Read
  ////
  .component('universidadeReadAddFab' , universidade.package.read.addFab)
  .component('universidadeReadFilter' , universidade.package.read.filter)
  .component('universidadeReadForm'   , universidade.package.read.form)
  .component('universidadeRead'       , universidade.package.read.read)

  ////
  // Update
  ////
  .component('universidadeUpdateForm' , universidade.package.update.form)
  .component('universidadeUpdate'     , universidade.package.update.update)
