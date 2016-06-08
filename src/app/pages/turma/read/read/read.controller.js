export default class CursoReadController {
  constructor($scope, universidadeStorage, unidadeStorage, cursoStorage, errorHandler) {
    'ngInject'
    this.$scope              = $scope
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.errorHandler        = errorHandler

    ////
    // Storage
    ////
    this.universidades     = []
    this.unidades          = []
    this.cursos            = []
    this.permUniversidades = []
    this.permUnidades      = []
    this.permCursos        = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.permUniversidades, this.watchPerm('universidades'))
    this.$scope.$watch(() => this.permUnidades, this.watchPerm('unidades'))
    this.$scope.$watch(() => this.permCursos, this.watchPerm('cursos'))

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
        .map(this.buildUniversidadeEntity())
      this.getCursosByUsuario()
    }
  }

  getCursosByUsuario() {
    this.cursoStorage.requestByUsuario().then(
      this.getCursosByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getCursosByUsuarioSuccess() {
    return () => {
      this.permCursos = this.cursoStorage.take()
        .map(this.buildUniversidadeEntity())
        .map(this.buildUnidadeEntity())
    }
  }

  buildUniversidadeEntity() {
    return (entity) => {
      let storage = this.universidadeStorage
      entity.universidade = storage.getById(entity.idUniversidade)
      return entity
    }
  }

  buildUnidadeEntity() {
    return (entity) => {
      let storage = this.unidadeStorage
      entity.unidade = storage.getById(entity.idUnidade)
      return entity
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
