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

    this.$localStorage.$reset
    this.initStorageRequests()

    this.permUniversidades = []
    this.permUnidades = []

    this.filterQuery = ''
    this.$scope.$watch(() => this.filterQuery, this.filterUnidades())

    this.unidades = []
    this.$scope.$watch(() => this.permUnidades, this.watchPermUnidade())
  }

  getUniversidadesByUsuarioSuccess() {
    return () => {
      this.permUniversidades = this.universidadeStorage.get()
      this.getUnidadesByUsuario()
    }
  }

  initStorageRequests() {
    this.universidadeStorage.requestByUsuario().then(
      this.getUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getUnidadesByUsuarioSuccess() {
    return () => {
      this.permUnidades = this.unidadeStorage.get()
        .map(unidade => {
          unidade.universidade = this.universidadeStorage
            .getById(unidade.idUniversidade)
          console.log(unidade)
          return unidade
        })
    }
  }

  getUnidadesByUsuario() {
    this.unidadeStorage.requestByUsuario().then(
      this.getUnidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
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

  watchPermUnidade() {
    return (data) => this.unidades = data
  }

  toggleFilterFormVisibility() {
    this.filterFormVisibility = !this.filterFormVisibility
  }

  clearFilters() {
    this.filterKey = 'none'
    this.filterQuery = ''
  }
}
