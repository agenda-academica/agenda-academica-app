export default class CreateUnidadeController {
  constructor($routeParams, $location, $localStorage, auth, unidade, errorHandler) {
    'ngInject'
    this.$routeParams = $routeParams
    this.$location = $location
    this.$localStorage = $localStorage
    this.authService = auth
    this.unidadeService = unidade
    this.errorHandlerService = errorHandler

    this.unidadeForm = {}
    this.hasUniversidadeId = this.$routeParams.id ? true : false
    this.currentIndex = this.getCurrentIndex($routeParams.id)
    this.currentUniversidade = this.getCurrentUniversidade(this.currentIndex)
    this.universidades = this.$localStorage.universidades
  }

  getCurrentUniversidade(index) {
    return this.$localStorage.universidades[index]
  }

  getCurrentIndex(id) {
    return this.$localStorage.universidades.findIndex(
      universidade => universidade.codigo == id
    )
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((unidade) => {
        this.$location.path(
          `/curso/create`
            .concat(`/${unidade.idUniversidade}`)
            .concat(`/${unidade.id}`)
        )
      })
    )
  }

  sendCreateRequest(successCallback) {
    let authObject = this.authService.get()
    let data = angular.copy(this.unidadeForm)
    data.idUsuario = authObject.id
    data.idUniversidade = this.$routeParams.id
      ? this.$routeParams.id
      : this.currentUniversidade.codigo

    this.unidadeService
      .api.root.create(data)
      .$promise.then(
        successCallback(data),
        this.errorHandlerService.request()
      )
  }

  getCreateSuccessCallback(redirectCallback) {
    return (data) => {
      return (success) => {
        if (this.validateSuccess(success)) {
          if (!this.validateUnidadeStorage(this.$localStorage.unidades)) {
            this.$localStorage.unidades = []
          }

          data.id = success.id
          this.$localStorage.unidades.push(data)
          redirectCallback(data)
        }
        else this.errorHandlerService.request()()
      }
    }
  }

  validateSuccess(success) {
    return success.requestStatus
      && success.requestStatus === true
  }

  validateUnidadeStorage(unidades) {
    return this.existsUnidadesStorage(unidades)
      && this.isArrayUnidadesStorage(unidades)
  }

  existsUnidadesStorage(unidades) {
    return unidades !== undefined
  }

  isArrayUnidadesStorage(unidades) {
    return unidades.constructor === Array
  }
}
