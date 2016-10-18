import angular       from 'angular'

import usuario       from './usuario/usuario.pages'
import calendar      from './calendar/calendar.pages'
import quadroHorario from './quadro-horario/quadro-horario.pages'
import universidade  from './universidade/universidade.pages'
import unidade       from './unidade/unidade.pages'
import curso         from './curso/curso.pages'
import turma         from './turma/turma.pages'
import disciplina    from './disciplina/disciplina.pages'
import periodoLetivo from './periodoLetivo/periodoLetivo.pages'
import aula          from './aula/aula.pages'
import representante from './representante/representante.pages'

export default angular
  .module('app.pages', [
    usuario.name,
    quadroHorario.name,
    calendar.name,
    universidade.name,
    unidade.name,
    curso.name,
    turma.name,
    disciplina.name,
    periodoLetivo.name,
    aula.name,
    representante.name,
  ])
