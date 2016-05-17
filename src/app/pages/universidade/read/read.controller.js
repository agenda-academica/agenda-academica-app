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
    this.sendShowRequest((success) => {
      if (this.validateSuccess(success)) {
        this.permanentUniversidadesData = success.list
        this.$localStorage.universidades = success.list
      }
      else
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

  validateSuccess(success) {
    return success.list
      && success.list.length > 0
      && success.list[success.list.length - 1].requestStatus === true
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

  sendShowRequest(successCallback) {
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
