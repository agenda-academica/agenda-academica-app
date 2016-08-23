export default class LoginController {
  constructor(
    $location,
    $q,
    $mdDialog,
    usuario,
    crypto,
    usuarioAuth,
    errorHandler
  ) {
    'ngInject'
    this.$location      = $location
    this.$q             = $q
    this.$mdDialog      = $mdDialog
    this.usuarioService = usuario
    this.crypto         = crypto
    this.usuarioAuth    = usuarioAuth
    this.errorHandler   = errorHandler
  }

  submit() {
    let data = {
      login: this.login,
      senha: this.crypto.gen(this.senha)
    }

    this.usuarioService.api.usuario.validate(data).$promise.then(
        this.getUsuarioValidateSuccess(),
        this.errorHandler.request()
      );
  }

  getUsuarioValidateSuccess() {
    return (success) => {
      let deferred = this.$q.defer()

      if (success.authenticated === 'true') {
        this.usuarioAuth.put(success)
        deferred.resolve()
        this.$location.path('/quadro-horario')
      }
      else if (success.hasLogin === 'false') {
        this.$mdDialog.show(this.getUsuarioHasLoginErrorMessage())
          .then(() => {
            this.$location.path('/usuario/create')
            deferred.resolve()
          })
      }
      else if (success.authenticated === 'false') {
        this.$mdDialog.show(this.getUsuarioAuthErrorMessage())
        deferred.resolve()
      }
      deferred.reject('Error: Usuario Login Request.')
      return deferred.promise
    }
  }

  getUsuarioHasLoginErrorMessage() {
    return this.$mdDialog.alert()
      .title('Autenticação')
      .textContent('Este usuário não existe. Cadastre-se para poder se logar.')
      .ok('Ok')
  }

  getUsuarioAuthErrorMessage() {
    return this.$mdDialog.alert()
      .title('Autenticação')
      .textContent('Você inseriu usuário e/ou senha incorretos. Tente novamente.')
      .ok('Ok')
  }
}
