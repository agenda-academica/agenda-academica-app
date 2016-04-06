export default class LoginController {

  constructor($http, $location, $mdDialog, apiUrl) {
    'ngInject';
    this.$http = $http
    this.$location = $location
    this.$mdDialog = $mdDialog
    this.apiUrl = apiUrl

    this.login = ''
    this.senha = ''
    this.originatorEv
  }

  submit() {
    var data = {
      login: this.login,
      senha: this.senha
    }

    this.$http
      .post(this.apiUrl + '/usuario/login', data)
      .then(
        (success) => {
          if (success.data.response === 'true')
            this.$location.path('/welcome')
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
      )
  }

}
