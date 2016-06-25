export default class TurmaReadController {
  constructor(
    $scope,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.errorHandler        = errorHandler

    ////
    // Storage
    ////
    this.universidades     = []
    this.unidades          = []
    this.cursos            = []
    this.turmas            = []
    this.permUniversidades = []
    this.permUnidades      = []
    this.permCursos        = []
    this.permTurmas        = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.permUniversidades, this.watchPerm('universidades'))
    this.$scope.$watch(() => this.permUnidades, this.watchPerm('unidades'))
    this.$scope.$watch(() => this.permCursos, this.watchPerm('cursos'))
    this.$scope.$watch(() => this.permTurmas, this.watchPerm('turmas'))

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
      this.getTurmasByUsuario()
    }
  }

  getTurmasByUsuario() {
    this.turmaStorage.requestByUsuario().then(
      this.getTurmasByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getTurmasByUsuarioSuccess() {
    return () => {
      this.permTurmas = this.turmaStorage.take()
        .map(this.buildUniversidadeEntity())
        .map(this.buildUnidadeEntity())
        .map(this.buildCursoEntity())
    }
  }

  buildUniversidadeEntity() {
    return entity => {
      entity.universidade = this.universidadeStorage.getById(entity.idUniversidade)
      return entity
    }
  }

  buildUnidadeEntity() {
    return entity => {
      entity.unidade = this.unidadeStorage.getById(entity.idUnidade)
      return entity
    }
  }

  buildCursoEntity() {
    return entity => {
      entity.curso = this.cursoStorage.getById(entity.idCurso)
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
