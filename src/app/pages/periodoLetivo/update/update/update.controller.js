export default class UpdatePeriodoLetivoController {
  constructor(
    $scope,
    $mdDialog,
    $routeParams,
    $location,
    usuarioAuth,
    periodoLetivoStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.usuarioAuth         = usuarioAuth
    this.periodoLetivoStorage = periodoLetivoStorage
    this.errorHandler        = errorHandler

    this.periodoLetivoForm = {}
    this.initStorageRequests()
  }

  initStorageRequests() {

    if (!this.periodoLetivoStorage.has())
      this.periodoLetivoStorage
        .requestByUsuario()
        .then(
          this.requestPeriodoLetivosByUsuarioSuccess(
            this.init()
          ),
          this.errorHandler.request()
        )
    else
      this.init()()
  }

  requestUniversidadesByUsuarioSuccess(initCallback) {
    return () => { initCallback() }
  }

  init() {
    return () => {
      this.periodoLetivoForm = this
        .periodoLetivoStorage
        .getById(this.$routeParams.id)

      if (!this.periodoLetivoForm) this.$location.path('/periodo-letivo')
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.updatePeriodoLetivo.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendUpdateRequest()
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }

  sendUpdateRequest() {
    let data    = angular.copy(this.periodoLetivoForm)
    let options = {id: data.id}
    data.idUsuario = this.usuarioAuth.take().id

    this.periodoLetivoStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => {
      this.$location.path('/periodo-letivo')
    }
   }
}
