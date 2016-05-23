import angular from 'angular'
import curso   from './curso.feature'

export default angular.module('app.pages.curso', [])

  ////
  // Configs
  ////
  .config(curso.config.routes)

  ////
  // Services
  ////
  .service('curso'        , curso.service.api)
  .service('cursoStorage' , curso.service.storage)

  ////
  // Create
  ////
  .component('cursoCreateForm' , curso.package.create.form)
  .component('cursoCreate'     , curso.package.create.create)

  ////
  // Read
  ////
  .component('cursoReadAddFab' , curso.package.read.addFab)
  .component('cursoReadFilter' , curso.package.read.filter)
  .component('cursoReadCards'  , curso.package.read.cards)
  .component('cursoRead'       , curso.package.read.read)

  ////
  // Update
  ////
  .component('cursoUpdateForm' , curso.package.update.form)
  .component('cursoUpdate'     , curso.package.update.update)
