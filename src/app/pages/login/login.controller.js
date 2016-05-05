export default class LoginController {
  constructor($http, $location, $mdDialog, login, crypto, auth) {
    'ngInject'
    this.$http = $http
    this.$location = $location
    this.$mdDialog = $mdDialog
    this.loginService = login
    this.crypto = crypto
    this.auth = auth

    this.originatorEv
  }

  submit() {
    let data = {
      login: this.login,
      senha: this.crypto.gen(this.senha)
    }

    this.loginService.api
      .validate(data).$promise.then(
        (success) => {
          if (success.authenticated === 'true') {
            this.$location.path('/index')
            this.auth.set(success)
          }
          else
            this.$mdDialog.show(
              this.$mdDialog.alert()
                .title('Errado ):')
                .textContent('Você inseriu um login e/ou senha incorretos.')
                .ok('Ok')
                .targetEvent(this.originatorEv)
            )
        },
        (error) => {
          this.$mdDialog.show(
            this.$mdDialog.alert()
              .title('Erro ):')
              .textContent(`Ops! Algo inesperado aconteceu. Aguarde um instante e
                tente novamente.`)
              .ok('Ok')
              .targetEvent(this.originatorEv)
          )
        }
      );
  }
}
