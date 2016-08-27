export default class CreatePeriodoLetivoController {
  constructor(
    $scope,
    $mdDialog,
    $location,
    usuarioAuth,
    periodoLetivoStorage,
    errorHandler,
    moment,
    $routeParams
  ) {
    'ngInject'
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$location = $location
    this.usuarioAuth = usuarioAuth
    this.periodoLetivoStorage = periodoLetivoStorage
    this.errorHandler = errorHandler
    this.moment = moment
    this.$routeParams = $routeParams

    this.periodoLetivoForm = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((periodoLetivo) => {
        this.$location.path(`/periodo-letivo/create/${this.$routeParams.idUniversidade}`)
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
        this.$location.path(`/periodo-letivo/${this.$routeParams.idUniversidade}`)
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data = angular.copy(this.periodoLetivoForm)
    data.idUsuario = this.usuarioAuth.take().id
    //TODO: Colocar o id da universidade aqui tambem


    data.dataInicio = this.moment(data.dataInicio).format('YYYY-MM-DD')

    data.dataFim = this.moment(data.dataFim).format('YYYY-MM-DD')

    this.periodoLetivoStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.periodoLetivoStorage.getLast())
      }
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
