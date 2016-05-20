import angular      from 'angular'
import universidade from './universidade.feature'

export default angular.module('app.pages.universidade', [])

  ////
  // Configs
  ////
  .config(universidade.routes)

  ////
  // Services
  ////
  .service('universidade'        , universidade.api)
  .service('universidadeStorage' , universidade.storage)

  ////
  // Create
  ////
  .component('universidadeCreateForm' , universidade.create.form)
  .component('universidadeCreate'     , universidade.create.create)

  ////
  // Read
  ////
  .component('universidadeReadAddFab' , universidade.read.addFab)
  .component('universidadeReadFilter' , universidade.read.filter)
  .component('universidadeReadForm'   , universidade.read.form)
  .component('universidadeRead'       , universidade.read.read)

  ////
  // Update
  ////
  .component('universidadeUpdateForm' , universidade.update.form)
  .component('universidadeUpdate'     , universidade.update.update)
