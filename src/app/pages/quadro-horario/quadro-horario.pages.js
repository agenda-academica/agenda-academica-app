import angular       from 'angular'
import quadroHorario from './quadro-horario.feature'

export default angular.module('app.pages.quadro-horario', [])
  ////
  // Configs
  ////
  .config(quadroHorario.config.routes)

  ////
  // Components
  ////
  .component('quadroHorarioEmptyMessage' , quadroHorario.component.emptyMessage)
  .component('quadroHorarioCards'        , quadroHorario.component.cards)
  .component('quadroHorarioCardAddAula'  , quadroHorario.component.cardAddAula)
  .component('quadroHorario'             , quadroHorario.component.quadroHorario)
  .component('quadroHorarioPainel'       , quadroHorario.component.painel)
