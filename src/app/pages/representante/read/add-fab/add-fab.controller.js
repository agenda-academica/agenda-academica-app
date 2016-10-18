export default class ReadRepresentanteController {
  constructor($routeParams, $location) {
    'ngInject'
    this.$routeParams = $routeParams
    this.$location = $location


  }

  getCreateRepresentantePath() {
    const { idUniversidade, idUnidade, idCurso, idTurma } = this.$routeParams
    this.$location.path(`/representante/create/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
  }




}
