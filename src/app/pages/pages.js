import angular from 'angular'

import app            from './app/app.component'
import universidades  from './universidades/universidades.component'
import unidades       from './unidades/unidades.component'
import cursos         from './cursos/cursos.component'
import login          from './login/login.component'

export default angular
  .module('app.pages', [])
  .component('app', app)
  .component('universidades', universidades)
  .component('unidades', unidades)
  .component('cursos', cursos)
  .component('login', login)
