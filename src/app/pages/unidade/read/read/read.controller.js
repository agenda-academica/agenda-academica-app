export default class UnidadeReadController {
  constructor($scope, universidadeStorage, unidadeStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.errorHandler        = errorHandler

    ////
    // Storage
    ////
    this.universidades     = []
    this.unidades          = []
    this.permUniversidades = []
    this.permUnidades      = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.permUniversidades, this.watchPerm('universidades'))
    this.$scope.$watch(() => this.permUnidades, this.watchPerm('unidades'))

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
      this.getUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getUniversidadesByUsuarioSuccess() {
    return () => {
      console.log(this.universidadeStorage.take())
      this.permUniversidades = this.universidadeStorage.take()
      this.getUnidadesByUsuario()
    }
  }

  getUnidadesByUsuario() {
    this.unidadeStorage.requestByUsuario().then(
      this.getUnidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getUnidadesByUsuarioSuccess() {
    return () => {
      this.permUnidades = this.unidadeStorage.take()
        .map(this.mapUniversidadeByUnidade())
      console.log(this.permUnidades)
    }
  }

  mapUniversidadeByUnidade() {
    return (unidade) => {
      let storage = this.universidadeStorage
      unidade.universidade = storage.getById(unidade.idUniversidade)
      return unidade
    }
  }

  watchPerm(name) {
    return (data) => { this[name] = data }
  }

  ////
  // Filtro
  ////
  toggleFilterFormVisibility() {
    this.filterVisibility = !this.filterVisibility
  }
}
