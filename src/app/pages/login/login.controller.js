export default class LoginController {
  constructor($http, $location, $mdDialog, $cookies, login, crypto) {
    'ngInject'
    this.$http = $http
    this.$location = $location
    this.$mdDialog = $mdDialog
    this.$cookies = $cookies
    this.loginService = login
    this.crypto = crypto

    this.originatorEv
  }

  submit() {
    var data = {
      login: this.login,
      senha: this.crypto.gen(this.senha)
    }

    this.loginService.api
      .validate(data).$promise.then(
        (success) => {
          if (success.response === 'true') {
            this.$location.path('/welcome')
            // Retornar objeto contendo:
            // - Verificação de autenticação do usuário;
            // - Objeto dos dados do usuário para salvar na session.
            // this.$cookies.setObject('auth', success.response)
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
