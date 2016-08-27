export default class PeriodoLetivoReadFormController {
  constructor($routeParams, $location) {
    this.$location = $location
    this.$routeParams = $routeParams
  }

  redirect(id) {
    this.$location.path(
      `/periodo-letivo/update/${this.$routeParams.idUniversidade}/${id}`
    )
 }
}
