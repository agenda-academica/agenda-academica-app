import angular from 'angular'
import evento from './evento.feature'

export default angular.module('app.pages.evento', [])

  ////
  // Configs
  ////
  .config(evento.config.routes)

  ////
  // Services
  ////
  .service('evento'        , evento.service.api)
  .service('eventoStorage' , evento.service.storage)

  ////
  // Create
  ////
  .component('eventoCreateForm' , evento.package.create.form)
  .component('eventoCreate'     , evento.package.create.create)

  ////
  // Read
  ////
  .component('eventoReadAddFab' , evento.package.read.addFab)
  .component('eventoReadFilter' , evento.package.read.filter)
  .component('eventoReadCards'  , evento.package.read.cards)
  .component('eventoRead'       , evento.package.read.read)
  //
  // ////
  // // Update
  // ////
  // .component('eventoUpdateForm' , evento.package.update.form)
  // .component('eventoUpdate'     , evento.package.update.update)
