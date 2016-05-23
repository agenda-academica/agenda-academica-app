import angular from 'angular'

import calendar            from './calendar/calendar.pages'
import quadroHorario       from './quadro-horario/quadro-horario.pages'
import universidade        from './universidade/universidade.pages'
import unidade             from './unidade/unidade.pages'
import curso               from './curso/curso.pages'
import login               from './login/login.component'
import signup              from './signup/signup.component'
import user                from './user/user.component'

export default angular
  .module('app.pages', [
    quadroHorario . name,
    calendar      . name,
    universidade  . name,
    unidade       . name,
    curso         . name,
  ])

  .component('login'    , login)
  .component('signup'   , signup)
  .component('userEdit' , user.edit)
