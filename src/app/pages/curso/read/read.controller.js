import temporaryUsjtLogoImage from './usjt.jpg'

export default class ReadUniversidadeController {
  constructor($localStorage, $scope, auth, universidade, errorHandler) {
    'ngInject'
    this.$localStorage = $localStorage
    this.$scope = $scope
    this.authService = auth
    this.universidadeService = universidade
    this.errorHandlerService = errorHandler
    this.temporaryUsjtLogoImage = temporaryUsjtLogoImage

    this.searchFormVisibility = false
    this.permanentUniversidadesData = []
    this.searchKeys = [
      {key: 'abreviacao', label: 'Abreviação'},
      {key: 'nome', label: 'Nome'}
    ]
    this.getUniversidades((success) => {
      if (success.list.length > 0) {
        this.permanentUniversidadesData = success.list
        this.$localStorage.universidades = success.list
      }
      else if (success.list.responseStatus !== 'true')
        this.errorHandlerService.request()()
    })

    this.universidades = []
    this.$scope.$watch(
      () => this.permanentUniversidadesData,
      this.watchPermanentUniversidadesData()
    )

    this.searchKey = 'none'
    this.searchQuery = ''
    this.$scope.$watch(() => this.searchQuery, this.filterUniversidades());
  }

  watchPermanentUniversidadesData() {
    return (data) => this.universidades = data
  }

  filterUniversidades () {
    return (key) => {
      this.universidades = this.permanentUniversidadesData
        .filter((universidade) =>
          new RegExp(this.searchQuery, 'gi')
            .test(universidade[this.searchKey])
        )
    }
  }

  toggleSearchFormVisibility() {
    this.searchFormVisibility = !this.searchFormVisibility
  }

  clearSearchFilters() {
    this.searchKey = 'none'
    this.searchQuery = ''
  }

  getUniversidades(successCallback) {
    let authObject = this.authService.get()
    let data = {id: authObject.id}

    this.universidadeService
      .api.usuario
      .show(data).$promise.then(
        successCallback,
        this.errorHandlerService.request()
      )
  }
}
