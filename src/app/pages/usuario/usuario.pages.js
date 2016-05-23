import angular from 'angular'
import usuario from './usuario.feature'

export default angular.module('app.pages.usuario', [])

  ////
  // Configs
  ////
  .config(usuario.config.routes)

  ////
  // Services
  ////
  .service('usuario'     , usuario.service.api)
  .service('usuarioAuth' , usuario.service.auth)

  ////
  // Login
  ////
  .component('usuarioLoginForm' , usuario.package.login.form)
  .component('usuarioLogin'     , usuario.package.login.login)

  ////
  // Create
  ////
  .component('usuarioCreateForm' , usuario.package.create.form)
  .component('usuarioCreate'     , usuario.package.create.create)

  ////
  // Update
  ////
  .component('usuarioUpdateForm' , usuario.package.update.form)
  .component('usuarioUpdate'     , usuario.package.update.update)
