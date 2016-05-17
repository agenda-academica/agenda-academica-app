import angular from 'angular'

import calendar             from './calendar/calendar.component'
import quadroHorario        from './quadro-horario/quadro-horario.component'
import quadroHorarioPainel  from './quadro-horario/painel/painel.component'
import universidade         from './universidade/universidade.component'
import unidade              from './unidade/unidade.component'
import curso                from './curso/curso.component'
import login                from './login/login.component'
import signup               from './signup/signup.component'
import user                 from './user/user.component'

export default angular
  .module('app.pages', [])

  // Calendar
  .component('calendarNavigation', calendar.calendarNavigation)
  .component('calendar', calendar.calendar)

  // Quadro de horario
  .component('quadroHorario', quadroHorario)
  .component('quadroHorarioPainel', quadroHorarioPainel)

  // Universidades
  .service('universidadeStorage', universidade.storage)
  .component('createUniversidade', universidade.create)
  .component('readUniversidade', universidade.read)
  .component('updateUniversidade', universidade.update)

  // Unidades
  .service('unidadeStorage', unidade.storage)
  .component('createUnidade', unidade.create)
  .component('readUnidade', unidade.read)

  // Cursos
  .component('createCurso', curso.create)

  .component('login', login)
  .component('signup', signup)
  .component('userEdit', user.edit)
