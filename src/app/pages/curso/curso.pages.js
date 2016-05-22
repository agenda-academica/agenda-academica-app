import angular from 'angular'
import curso from './curso.feature'

export default angular.module('app.pages.curso', [])

  ////
  // Configs
  ////
  .config(curso.routes)

  ////
  // Services
  ////
  .service('curso'        , curso.api)
  .service('cursoStorage' , curso.storage)

  ////
  // Create
  ////
  .component('cursoCreateForm' , curso.create.form)
  .component('cursoCreate'     , curso.create.create)

  ////
  // Read
  ////
  .component('cursoReadAddFab' , curso.read.addFab)
  .component('cursoReadFilter' , curso.read.filter)
  .component('cursoReadCards'  , curso.read.cards)
  .component('cursoRead'       , curso.read.read)

  ////
  // Update
  ////
  .component('cursoUpdateForm' , curso.update.form)
  .component('cursoUpdate'     , curso.update.update)
