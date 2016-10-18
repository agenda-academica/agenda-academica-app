export default class RepresentanteReadFormController {
  constructor($routeParams, $location) {
    this.$location = $location
    this.$routeParams = $routeParams
  }

  redirect(id) {

const { idUniversidade, idUnidade, idCurso, idTurma} = this.$routeParams
//TODO: ARRUMAR AQUI
    this.$location.path(
        `/representante/update/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}/${id}`
        )

 }
}
