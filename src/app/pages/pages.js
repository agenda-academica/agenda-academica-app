import angular from 'angular'

import app            from './app/app.component'
import universidades  from './universidades/universidades.component'
import unidades       from './unidades/unidades.component'
import cursos         from './cursos/cursos.component'
import login          from './login/login.component'
import signup          from './signup/signup.component'

export default angular
  .module('app.pages', [])
  .component('app', app)
  .component('universidadesConsultar', universidades.consultar)
  .component('universidadesCadastrar', universidades.cadastrar)
  .component('unidades', unidades)
  .component('cursos', cursos)
  .component('login', login)
  .component('signup', signup)
