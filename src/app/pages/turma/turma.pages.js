/*
Classe responsavel por definir as configurações, serviçoes e componentes
*/

import angular from 'angular'
import turma   from './turma.feature'

export default angular.module('app.pages.turma', [])

  ////
  // Configs
  ////
  .config(turma.config.routes)

  ////
  // Services
  ////
  .service('turma'        , turma.service.api)
  .service('turmaStorage' , turma.service.storage)

  ////
  // Create
  ////
  .component('turmaCreateForm' , turma.package.create.form)
  .component('turmaCreate'     , turma.package.create.create)

  ////
  // Read
  ////
  .component('turmaReadAddFab' , turma.package.read.addFab)
  .component('turmaReadFilter' , turma.package.read.filter)
  .component('turmaReadCards'  , turma.package.read.cards)
  .component('turmaRead'       , turma.package.read.read)

  ////
  // Update
  ////
  .component('turmaUpdateForm' , turma.package.update.form)
  .component('turmaUpdate'     , turma.package.update.update)
