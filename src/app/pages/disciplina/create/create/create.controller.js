export default class DisciplinaCreateController {
  constructor(
    $scope,
    $mdDialog,
    $location,
    moment,
    usuarioAuth,
    disciplinaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope            = $scope
    this.$mdDialog         = $mdDialog
    this.$location         = $location
    this.moment            = moment
    this.usuarioAuth       = usuarioAuth
    this.disciplinaStorage = disciplinaStorage
    this.errorHandler      = errorHandler

    this.form = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((disciplina) => {
        this.$location.path(`/quadro-horario/dia/${disciplina.diaSemana}`)
      })
    )
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.create.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendCreateRequest(
      this.getCreateSuccessCallback(() => {
        this.$location.path(`/quadro-horario/dia/${disciplina.diaSemana}`)
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data            = angular.copy(this.form)
    data.idUsuario      = this.usuarioAuth.take().id
    data.idUniversidade = data.universidade.id
    data.idUnidade      = data.unidade.id
    data.idCurso        = data.curso.id
    data.idTurma        = data.turma.id
    data.horaInicio     = this.moment(data.horaInicio).format('HH:mm:ss')
    data.horaFim        = this.moment(data.horaFim).format('HH:mm:ss')

    this.disciplinaStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => callback(this.disciplinaStorage.getLast())
    }
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }
}
