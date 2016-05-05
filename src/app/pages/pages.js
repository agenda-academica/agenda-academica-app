import angular from 'angular'

import index          from './index/index.component'
import universidades  from './universidades/universidades.component'
import unidades       from './unidades/unidades.component'
import cursos         from './cursos/cursos.component'
import login          from './login/login.component'
import signup         from './signup/signup.component'
import user           from './user/user.component'

export default angular
  .module('app.pages', [])
  .component('index', index)
  // Universidades
  .component('universidadesConsultar', universidades.consulta)
  .component('universidadesCadastrar', universidades.cadastrar)
  .component('universidadesAlterar', universidades.alterar)
  // Unidades
  .component('cadastroUnidades', unidades.cadastro)
  .component('cursos', cursos)
  .component('login', login)
  .component('signup', signup)
  .component('userEdit', user.edit)
