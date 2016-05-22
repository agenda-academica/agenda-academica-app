export default class SignupController {
  constructor($http, $q, $mdDialog, $location, crypto, usuario, auth, errorHandler) {
    'ngInject'
    this.$http          = $http
    this.$q             = $q
    this.$mdDialog      = $mdDialog
    this.$location      = $location
    this.crypto         = crypto
    this.usuarioService = usuario
    this.authObject     = auth
    this.errorHandler   = errorHandler
  }

  submit() {
    let data = {
      nome    : this.nome,
      login   : this.login,
      email   : this.email,
      celular : this.celular.replace(/\D/g, ''),
      senha   : this.crypto.gen(this.senha)
    }

    this.usuarioService.api
      .create(data).$promise.then(
        this.getCreateSuccess(),
        this.errorHandler.request()
      )
  }

  getCreateSuccess() {
    return (success) => {
      let deferred = this.$q.defer()

      if (success.codigo) {
        this.authObject.set(success)
        this.$location.path('/quadro-horario')
        deferred.resolve()
      }
      else deferred.reject('Error: Create Usuário Request.')
      return deferred.promise
    }
  }
}
