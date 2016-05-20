import angular from 'angular'

import calendar            from './calendar/calendar.pages'
import quadroHorario       from './quadro-horario/quadro-horario.component'
import quadroHorarioPainel from './quadro-horario/painel/painel.component'
import universidade        from './universidade/universidade.pages'
import unidade             from './unidade/unidade.pages'
import curso               from './curso/curso.component'
import login               from './login/login.component'
import signup              from './signup/signup.component'
import user                from './user/user.component'

export default angular
  .module('app.pages', [
    calendar.name,
    universidade.name,
    unidade.name,
  ])

  // Quadro de horário
  .component('quadroHorario', quadroHorario)
  .component('quadroHorarioPainel', quadroHorarioPainel)

  // Cursos
  .component('createCurso', curso.create)

  .component('login', login)
  .component('signup', signup)
  .component('userEdit', user.edit)
