import angular from 'angular'
import disciplina from './disciplina.feature'

export default angular.module('app.pages.disciplina', [])

  ////
  // Configs
  ////
  .config(disciplina.config.routes)

  ////
  // Services
  ////
  .service('disciplina'        , disciplina.service.api)
  .service('disciplinaStorage' , disciplina.service.storage)

  ////
  // Create
  ////
  .component('disciplinaCreateForm' , disciplina.package.create.form)
  .component('disciplinaCreate'     , disciplina.package.create.create)

  ////
  // Read
  ////
  .component('disciplinaReadAddFab' , disciplina.package.read.addFab)
  .component('disciplinaReadFilter' , disciplina.package.read.filter)
  .component('disciplinaReadCards'  , disciplina.package.read.cards)
  .component('disciplinaRead'       , disciplina.package.read.read)

  ////
  // Update
  ////
  // .component('disciplinaUpdate'     , disciplina.package.update.update)
