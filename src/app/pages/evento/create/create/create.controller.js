export default class EventoCreateController {
  constructor(
    $scope,
    $mdDialog,
    $location,
    moment,
    usuarioAuth,
    eventoStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope            = $scope
    this.$mdDialog         = $mdDialog
    this.$location         = $location
    this.moment            = moment
    this.usuarioAuth       = usuarioAuth
    this.eventoStorage = eventoStorage
    this.errorHandler      = errorHandler

    this.form = {}
  }

  redirect() {
    return () => { this.$location.path(`/evento`) }
  }

  submit() {
    this.sendCreateRequest(this.getCreateSuccessCallback(this.redirect()))
  }

  submitOutsideForm() {
    const childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.create.$invalid) return this.$mdDialog.show(this.getPreenchimentoAlert())
    this.sendCreateRequest(this.getCreateSuccessCallback(this.redirect()))
  }

  sendCreateRequest(successCallback) {
    const data          = angular.copy(this.form)
    const dateFormat    = 'YYYY-MM-DD'
    const hourFormat    = 'HH:mm:ss'
    data.idUsuario      = this.usuarioAuth.take().id
    data.idUniversidade = data.universidade.id
    data.idUnidade      = data.unidade.id
    data.idCurso        = data.curso.id
    data.idTurma        = data.turma.id
    data.idDisciplina   = data.disciplina.id
    data.dataInicio     = this.moment(data.dataInicio).format(dateFormat)
    data.dataFim        = this.moment(data.dataFim).format(dateFormat)
    data.horaInicio     = this.moment(data.horaInicio).format(hourFormat)
    data.horaFim        = this.moment(data.horaFim).format(hourFormat)
    console.log(data)

    this.eventoStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return data => () => callback()
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios foram feitos
        corretamente.`)
      .ok('Ok, vou verificar')
  }
}
