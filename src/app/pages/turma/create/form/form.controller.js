export default class UnidadeCreateFormController {
  constructor($scope, $routeParams, universidadeStorage, unidadeStorage, cursoStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.$routeParams        = $routeParams
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.errorHandler        = errorHandler

    this.permUnidades = []
    this.permCursos   = []
    this.universidades = []
    this.unidades      = []
    this.cursos        = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.parent.form.universidade, this.watchUniversidadeSelect())
    this.$scope.$watch(() => this.parent.form.unidade, this.watchUnidadeSelect())
    this.$scope.$watch(() => this.permUnidades, this.filterUnidades())
    this.$scope.$watch(() => this.permCursos, this.filterCursos())
  }

  watchUniversidadeSelect() {
    return (universidade) => {
      this.filterUnidades(universidade)
    }
  }

  watchUnidadeSelect() {
    console.log('qqq')
    return (unidade) => {
      this.filterCursos(unidade)
    }
  }

  filterUnidades(universidade) {
    this.unidades = this.permUnidades.filter((unidade) =>
      unidade.idUniversidade === universidade.id
    )
    this.hasUnidades = this.unidades.length
  }

  filterCursos(unidade) {
     this.cursos = this.permCursos.filter((curso) =>
      curso.idUnidade === unidade.id
    )
    this.hasCursos = this.cursos.length
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

      // cursos
      this.cursoStorage.requestByUsuario().then(
        this.requestCursosByUsuarioSuccess(),
        this.errorHandler.request()
        )
    }
  }

   requestCursosByUsuarioSuccess() {
    return () => {
      this.permCursos = this.cursoStorage.take()
      let idCurso    = this.$routeParams.idCurso

      if (idCurso) {
        this.filterCursos(this.currentUnidade)
        this.currentCursoIndex = this.cursos
          .findIndex(this.cursoStorage.findIndexById(idCurso))
        this.hasCursoId        = this.currentCursoIndex !== -1
        this.hasCursos         = true
      }
    }
  }
}
