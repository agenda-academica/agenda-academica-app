export default class CreateUniversidadeController {
  constructor($scope, $mdDialog, $localStorage, $location, auth, universidade, errorHandler) {
    'ngInject'
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$localStorage = $localStorage
    this.$location = $location
    this.authService = auth
    this.universidadeService = universidade
    this.errorHandlerService = errorHandler

    this.universidadeForm = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((codigo) => {
        this.$location.path(`/unidade/create/${codigo}`)
      })
    )
  }

  submitGoBack() {
    if (this.$scope.createUniversidade.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendCreateRequest(
      this.getCreateSuccessCallback(() => {
        this.$location.path(`/universidade/read`)
      })
    )
  }

  sendCreateRequest(successCallback) {
    let authObject = this.authService.get()
    let data = angular.copy(this.universidadeForm)
    data.codigoUsuario = authObject.id

    this.universidadeService
      .api.root
      .create(data).$promise.then(
        successCallback(data),
        this.errorHandlerService.request()
      )
  }

  getCreateSuccessCallback(redirectCallback) {
    return (data) => {
      return (success) => {
        if (this.validateSuccess(success)) {
          let universidadesStorage = this.$localStorage.universidades
          if (!this.validateUniversidadesStorage(universidadesStorage)) {
            this.$localStorage.universidades = []
          }

          data.codigo = success.codigo
          this.$localStorage.universidades.push(data)
          redirectCallback(success.codigo)
        }
        else this.errorHandlerService.request()()
      }
    }
  }

  validateSuccess(success) {
    return success.requestStatus
      && success.requestStatus === true
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }

  validateUniversidadesStorage(universidades) {
    return this.existsUniversidadesStorage(universidades)
      && this.isArrayUniversidadesStorage(universidades)
  }

  existsUniversidadesStorage(universidades) {
    return universidades !== undefined
  }

  isArrayUniversidadesStorage(universidades) {
    return universidades.constructor === Array
  }
}
