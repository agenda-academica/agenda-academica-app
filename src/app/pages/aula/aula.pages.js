import angular from 'angular'
import aula from './aula.feature'

export default angular.module('app.pages.aula', [])

  ////
  // Configs
  ////
  .config(aula.config.routes)

  ////
  // Info
  ////
  .component('aulaInfoAddFab' , aula.package.info.addFab)
  .component('aulaInfo'       , aula.package.info.info)
