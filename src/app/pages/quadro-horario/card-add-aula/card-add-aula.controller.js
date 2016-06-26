export default class QuadroHorarioCardAddAulaController {
  constructor($location) {
    'ngInject'
    this.$location = $location
  }

  redir() {
    this.$location.path(`/disciplina/createFromDiaSemana/${this.weekDay}`)
  }
}
