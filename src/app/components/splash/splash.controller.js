export default class SplashController {
  constructor($location, usuarioAuth) {
    'ngInject'
    this.$location   = $location
    this.usuarioAuth = usuarioAuth

    this.verifyUsuarioAuth()
  }

  verifyUsuarioAuth() {
    if (this.usuarioAuth.has()) this.$location.path('/quadro-horario')
  }
}
