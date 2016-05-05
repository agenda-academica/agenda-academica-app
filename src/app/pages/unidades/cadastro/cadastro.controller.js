export default class CadastrarUniversidadesController {
  constructor($routeParams, $location, $cookies, auth, universidade) {
    'ngInject'
    this.$routeParams = $routeParams
    this.$location = $location
    this.$cookies = $cookies
    this.authService = auth
    this.universidadeService = universidade
    this.unidadeForm = {}

    console.log($routeParams.id)
    console.log($cookies.getObject('universidade-entities'))
  }

  submit() {
    let authObject = this.authService.get()
    let data = angular.copy(this.universidadeForm)
    data.codigoUsuario = authObject.id

    this.universidadeService.api
      .create(data).$promise.then(
        (success) => {
          if (success.$resolved === true) {
            this.$cookies.putObject('universidade-entities', data)
            this.$location.path(`/unidades/cadastrar/${success.codigo}`)
          }
        },
        (error) => {
          console.log(error)
        }
      )

    console.log(data)
    return false
  }
}
