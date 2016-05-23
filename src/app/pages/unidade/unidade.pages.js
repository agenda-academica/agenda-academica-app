import angular from 'angular'
import unidade from './unidade.feature'

export default angular.module('app.pages.unidade', [])
  ////
  // Configs
  ////
  .config(unidade.config.routes)

  ////
  // Services
  ////
  .service('unidade'        , unidade.service.api)
  .service('unidadeStorage' , unidade.service.storage)

  ////
  // Read
  ////
  .component('unidadeReadAddFab' , unidade.package.read.addFab)
  .component('unidadeReadFilter' , unidade.package.read.filter)
  .component('unidadeReadCards'  , unidade.package.read.cards)
  .component('unidadeRead'       , unidade.package.read.read)

  ////
  // Create
  ////
  .component('unidadeCreateForm' , unidade.package.create.form)
  .component('unidadeCreate'     , unidade.package.create.create)

  ////
  // Update
  ////
  .component('unidadeUpdateForm' , unidade.package.update.form)
  .component('unidadeUpdate'     , unidade.package.update.update)
