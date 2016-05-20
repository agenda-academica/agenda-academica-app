export default class UnidadeCreateFormController {
  constructor($scope, $routeParams, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.$routeParams        = $routeParams
    this.universidadeStorage = universidadeStorage
    this.errorHandler        = errorHandler

    this.universidades = []
    this.initStorageRequests()
  }

  initStorageRequests() {
    this.universidadeStorage.requestByUsuario().then(
      this.requestUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  requestUniversidadesByUsuarioSuccess() {
    return () => {
      this.universidades            = this.universidadeStorage.take()
      let idUniversidade            = this.$routeParams.idUniversidade
      this.currentUniversidadeIndex = this.universidadeStorage.getIndexOf(idUniversidade)
      this.hasUniversidadeId        = this.currentUniversidadeIndex !== -1
    }
  }
}
