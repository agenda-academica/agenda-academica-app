import angular from 'angular'
import unidade from './unidade.feature'

export default angular.module('app.pages.unidade', [])

  ////
  // Configs
  ////
  .config(unidade.routes)

  ////
  // Services
  ////
  .service('unidade'        , unidade.api)
  .service('unidadeStorage' , unidade.storage)

  ////
  // Read
  ////
  .component('unidadeReadAddFab' , unidade.read.addFab)
  .component('unidadeReadFilter' , unidade.read.filter)
  .component('unidadeReadCards'  , unidade.read.cards)
  .component('unidadeRead'       , unidade.read.read)

  ////
  // Create
  ////
  .component('unidadeCreateForm' , unidade.create.form)
  .component('unidadeCreate'     , unidade.create.create)

  ////
  // Update
  ////
  .component('unidadeUpdateForm' , unidade.update.form)
  .component('unidadeUpdate'     , unidade.update.update)
