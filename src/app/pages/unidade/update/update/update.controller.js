export default class UnidadeUpdateController {
  constructor($scope, $mdDialog, $routeParams, $location, auth, universidadeStorage, unidadeStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.authService         = auth
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.errorHandler        = errorHandler

    ////
    // Form
    ////
    this.unidadeForm = {}

    ////
    // Storage
    ////
    this.universidades     = []
    this.unidades          = []
    this.permUniversidades = []
    this.permUnidades      = []
    this.initStorageRequests()
  }

  initStorageRequests() {
    let hasStorages = this.universidadeStorage.has()
      || this.unidadeStorage.has()


    if (!hasStorages)
      this.universidadeStorage.requestByUsuario().then(
        this.requestUniversidadeByUsuarioSuccess(),
        this.errorHandler.request()
      )
    else
      this.init()()
  }

  requestUniversidadeByUsuarioSuccess() {
    return () => {
      this.unidadeStorage.requestByUsuario().then(
        this.requestUnidadesByUsuarioSuccess(this.init()),
        this.errorHandler.request()
      )
    }
  }

  requestUnidadesByUsuarioSuccess(initCallback) {
    return () => { initCallback() }
  }

  init() {
    return () => {
      // Universidade
      this.universidades = this.universidadeStorage.take()
      this.universidadeSelectedIndex = this.universidadeStorage
        .getIndexOf(this.$routeParams.idUniversidade)

      // Unidade
      this.unidadeForm = this.unidadeStorage.getById(this.$routeParams.id)

      let valid = this.unidadeForm != undefined
        && this.universidadeSelectedIndex !== -1

      if (!valid) this.$location.path('/unidade')
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.updateUnidade.$invalid) {
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
    let data    = angular.copy(this.unidadeForm)
    let options = {id: data.id}

    this.unidadeStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => { this.$location.path('/unidade') }
  }
}
