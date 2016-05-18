import temporaryUsjtLogoImage from './usjt.jpg'
import temporaryMackLogoImage from './mackenzie.jpg'
import temporaryFiapLogoImage from './fiap.jpg'

export default class ReadUniversidadeController {
  constructor($scope, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope = $scope
    this.universidadeStorage = universidadeStorage
    this.errorHandler = errorHandler

    ////
    // Temporary
    ////
    this.temporaryUsjtLogoImage = temporaryUsjtLogoImage
    this.temporaryMackLogoImage = temporaryMackLogoImage
    this.temporaryFiapLogoImage = temporaryFiapLogoImage

    this.permUniversidades = []
    this.initStorageRequests()

    this.universidades = []
    this.$scope.$watch(() => this.permUniversidades, this.watchPermUniversidades())

    ////
    // Filtro
    ////
    this.filterKeyOptions = [
      {key: 'abreviacao', label: 'Abreviação'},
      {key: 'nome', label: 'Nome'}
    ]
    this.filterFormVisibility = false
    this.filterKeySelected = 'none'
    this.filterQuery = ''
    this.$scope.$watch(() => this.filterKeySelected, this.filterUniversidades())
    this.$scope.$watch(() => this.filterQuery, this.filterUniversidades());
  }

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
  // Temporary
  ////

  showFirstLetterLogo(quadro) {
    return quadro.logo !== null
      && ['USJT', 'Mackenzie', 'FIAP'].indexOf(quadro.abreviacao) === -1
  }

  showLogo(quadro) {
    return quadro.logo === null
      || ['USJT', 'Mackenzie', 'FIAP'].indexOf(quadro.abreviacao) !== -1
  }

  getLogoImage(quadro) {
    if (quadro.abreviacao === 'USJT')
      return this.temporaryUsjtLogoImage

    else if (quadro.abreviacao === 'Mackenzie')
      return this.temporaryMackLogoImage

    else if (quadro.abreviacao === 'FIAP')
      return this.temporaryFiapLogoImage
  }

  ////
  // Filtro
  ////
  filterUniversidades () {
    return (key) => {
      this.universidades = this.permUniversidades
        .filter((universidade) =>
          new RegExp(this.filterQuery, 'gi')
            .test(universidade[this.filterKeySelected])
        )
    }
  }

  toggleFilterFormVisibility() {
    this.filterFormVisibility = !this.filterFormVisibility
  }

  clearFilters() {
    this.filterKeySelected = 'none'
    this.filterQuery = ''
  }
}
