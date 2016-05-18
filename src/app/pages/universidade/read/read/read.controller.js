export default class ReadUniversidadeController {
  constructor($scope, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope = $scope
    this.universidadeStorage = universidadeStorage
    this.errorHandler = errorHandler

    ////
    // Storage
    ////
    this.permUniversidades = []
    this.universidades = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.permUniversidades, this.watchPermUniversidades())

    ////
    // Filter
    ////
    this.filterVisibility = false
  }

  ////
  // Storage
  ////
  initStorageRequests() {
    this.universidadeStorage.requestByUsuario().then(
      this.requestUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  requestUniversidadesByUsuarioSuccess() {
    return () => {
      this.permUniversidades = this.universidadeStorage.take()
    }
  }

  watchPermUniversidades() {
    return (data) => this.universidades = data
  }

  ////
  // Filtro
  ////
  toggleFilterFormVisibility() {
    this.filterVisibility = !this.filterVisibility
  }
}
