export default class ReadRepresentanteController {
  constructor($scope, representanteStorage, errorHandler, $routeParams, $location) {
    'ngInject'
    this.$scope = $scope
    this.representanteStorage = representanteStorage
    this.errorHandler = errorHandler
    this.$routeParams = $routeParams
    this.$location = $location

    ////
    // Storage
    ////
    this.permRepresentantes = []
    this.representantes = []
    this.initStorageRequests()
    this.$scope.$watch(() => this.permRepresentantes, this.watchPermRepresentantes())

    ////
    // Filter
    ////
    this.filterVisibility = false
  }

  ////
  // Storage
  ////
  initStorageRequests() {
    this.representanteStorage.requestByUsuario().then(
      this.requestRepresentantesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  requestRepresentantesByUsuarioSuccess() {
    return () => {
      this.permRepresentantes = this.representanteStorage.take()
    }
  }

  watchPermRepresentantes() {
    return (data) => this.representantes = data
  }

  ////
  // Filtro
  ////
  toggleFilterFormVisibility() {
    this.filterVisibility = !this.filterVisibility
  }



}
