export default class UnidadeCreateFormController {
  constructor($scope, $routeParams, universidadeStorage, unidadeStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.$routeParams        = $routeParams
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.errorHandler        = errorHandler

    this.permUnidades = []
    this.universidades = []
    this.unidades      = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.parent.form.universidade, this.watchUniversidadeSelect())
    this.$scope.$watch(() => this.permUnidades, this.filterUnidades())
  }

  watchUniversidadeSelect() {
    return (universidade) => {
      this.filterUnidades(universidade)
    }
  }

  filterUnidades(universidade) {
    this.unidades = this.permUnidades.filter((unidade) =>
      unidade.idUniversidade === universidade.id
    )
    this.hasUnidades = this.unidades.length
  }

  initStorageRequests() {
    this.universidadeStorage.requestByUsuario().then(
      this.requestUniversidadesByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  requestUniversidadesByUsuarioSuccess() {
    return () => {
      this.universidades = this.universidadeStorage.take()
      let idUniversidade = this.$routeParams.idUniversidade

      if (idUniversidade) {
        this.currentUniversidade      = this.universidadeStorage.getById(idUniversidade)
        this.currentUniversidadeIndex = this.universidadeStorage.getIndexOf(idUniversidade)
        this.hasUniversidadeId        = this.currentUniversidadeIndex !== -1
      }

      // Unidades
      this.unidadeStorage.requestByUsuario().then(
        this.requestUnidadesByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestUnidadesByUsuarioSuccess() {
    return () => {
      this.permUnidades = this.unidadeStorage.take()
      let idUnidade     = this.$routeParams.idUnidade

      if (idUnidade) {
        this.filterUnidades(this.currentUniversidade)
        this.currentUnidadeIndex = this.unidades
          .findIndex(this.unidadeStorage.findIndexById(idUnidade))
        this.hasUnidadeId        = this.currentUnidadeIndex !== -1
        this.hasUnidades         = true
      }
      console.log(idUnidade)
      console.log(this.currentUnidadeIndex)
      console.log(this.hasUnidadeId)
    }
  }
}
