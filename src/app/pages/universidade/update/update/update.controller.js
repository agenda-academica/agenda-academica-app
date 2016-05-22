export default class UpdateUniversidadeController {
  constructor($scope, $mdDialog, $routeParams, $location, auth, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.authService         = auth
    this.universidadeStorage = universidadeStorage
    this.errorHandler        = errorHandler

    this.universidadeForm = {}
    this.initStorageRequests()
  }

  initStorageRequests() {
    if (!this.universidadeStorage.has())
      this.universidadeStorage
        .requestByUsuario()
        .then(
          this.requestUniversidadesByUsuarioSuccess(
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
      this.universidadeForm = this
        .universidadeStorage
        .getById(this.$routeParams.id)

      if (!this.universidadeForm) this.$location.path('/universidade')
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.updateUniversidade.$invalid) {
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
    let data    = angular.copy(this.universidadeForm)
    let options = {id: data.id}
    data.idUsuario = this.authService.get().id

    this.universidadeStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => {
      this.$location.path('/universidade')
    }
  }
}
