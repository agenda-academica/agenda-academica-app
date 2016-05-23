export default class UsuarioCreateController {
  constructor(
    $http,
    $q,
    $mdDialog,
    $location,
    crypto,
    usuario,
    usuarioAuth,
    errorHandler
  ) {
    'ngInject'
    this.$http          = $http
    this.$q             = $q
    this.$mdDialog      = $mdDialog
    this.$location      = $location
    this.crypto         = crypto
    this.usuarioService = usuario
    this.usuarioAuth    = usuarioAuth
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

    this.usuarioService.api.root.create(data).$promise.then(
        this.getCreateSuccess(),
        this.errorHandler.request()
      )
  }

  getCreateSuccess() {
    return (success) => {
      let deferred = this.$q.defer()

      if (success.codigo) {
        this.usuarioAuth.put(success)
        this.$location.path('/quadro-horario')
        deferred.resolve()
      }
      else deferred.reject('Error: Usuário Create Request.')
      return deferred.promise
    }
  }
}
