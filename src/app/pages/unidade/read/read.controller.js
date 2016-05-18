import temporaryUsjtLogoImage from './../../universidade/read/usjt.jpg'

export default class ReadUnidadeController {
  constructor(
    $scope,
    $localStorage,
    universidadeStorage,
    unidadeStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope = $scope
    this.$localStorage = $localStorage
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage = unidadeStorage
    this.errorHandler = errorHandler
    this.temporaryUsjtLogoImage = temporaryUsjtLogoImage

    this.permUniversidades = []
    this.permUnidades = []
    this.initStorageRequests()

    this.filterQuery = ''
    this.$scope.$watch(() => this.filterQuery, this.filterUnidades())

    this.unidades = []
    this.$scope.$watch(() => this.permUnidades, this.watchPermUnidades())
  }

  initStorageRequests() {
    this.universidadeStorage.requestByUsuario().then(
      this.getUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getUniversidadesByUsuarioSuccess() {
    return () => {
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
    }
  }

  mapUniversidadeByUnidade() {
    return (unidade) => {
      let storage = this.universidadeStorage
      unidade.universidade = storage.getById(unidade.idUniversidade)
      return unidade
    }
  }

  watchPermUnidades() {
    return (data) => this.unidades = data
  }

  toggleFilterFormVisibility() {
    this.filterFormVisibility = !this.filterFormVisibility
  }

  filterUnidades () {
    return (key) => {
      this.universidades = this.permUnidades
        .filter((unidade) =>
          new RegExp(this.searchQuery, 'gi')
            .test(unidade[this.searchKey])
        )
    }
  }

  clearFilters() {
    this.filterKey = 'none'
    this.filterQuery = ''
  }
}
