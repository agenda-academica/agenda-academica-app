export default class ReadPeriodoLetivoController {
  constructor($scope, periodoLetivoStorage, errorHandler, $routeParams, $location) {
    'ngInject'
    this.$scope = $scope
    this.periodoLetivoStorage = periodoLetivoStorage
    this.errorHandler = errorHandler
    this.$routeParams = $routeParams
    this.$location = $location

    ////
    // Storage
    ////
    this.permPeriodoLetivos = []
    this.periodoLetivos = []
    this.initStorageRequests()
    this.$scope.$watch(() => this.permPeriodoLetivos, this.watchPermPeriodoLetivos())

    ////
    // Filter
    ////
    this.filterVisibility = false
  }

  ////
  // Storage
  ////
  initStorageRequests() {
    this.periodoLetivoStorage.requestByUsuario().then(
      this.requestPeriodoLetivosByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  requestPeriodoLetivosByUsuarioSuccess() {
    return () => {
      this.permPeriodoLetivos = this.periodoLetivoStorage.take()
    }
  }

  watchPermPeriodoLetivos() {
    return (data) => this.periodoLetivos = data
  }

  ////
  // Filtro
  ////
  toggleFilterFormVisibility() {
    this.filterVisibility = !this.filterVisibility
  }



}
