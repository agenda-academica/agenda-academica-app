export default class ReadPeriodoLetivoController {
  constructor($routeParams, $location) {
    'ngInject'
    this.$routeParams = $routeParams
    this.$location = $location


  }

  getCreatePeriodoPath() {
    this.$location.path(`/periodo-letivo/create/${this.$routeParams.idUniversidade}`)
  }

}
