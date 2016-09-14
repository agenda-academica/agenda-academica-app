export default class EventoReadController {
  constructor(
    $scope,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    disciplinaStorage,
    eventoStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.disciplinaStorage   = disciplinaStorage
    this.eventoStorage       = eventoStorage
    this.errorHandler        = errorHandler

    ////
    // Storage
    ////
    this.universidades     = []
    this.unidades          = []
    this.cursos            = []
    this.turmas            = []
    this.disciplinas       = []
    this.eventos           = []

    this.permUniversidades = []
    this.permUnidades      = []
    this.permCursos        = []
    this.permTurmas        = []
    this.permDisciplinas   = []
    this.permEventos       = []
    this.initStorageRequests()

    this.$scope.$watch(() => this.permUniversidades, this.watchPerm('universidades'))
    this.$scope.$watch(() => this.permUnidades, this.watchPerm('unidades'))
    this.$scope.$watch(() => this.permCursos, this.watchPerm('cursos'))
    this.$scope.$watch(() => this.permTurmas, this.watchPerm('turmas'))
    this.$scope.$watch(() => this.permDisciplinas, this.watchPerm('disciplinas'))
    this.$scope.$watch(() => this.permEventos, this.watchPerm('eventos'))

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
      this.getDisciplinasByUsuario()
    }
  }

  getDisciplinasByUsuario() {
    this.disciplinaStorage.requestByUsuario().then(
      this.getDisciplinasByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getDisciplinasByUsuarioSuccess() {
    return () => {
      this.permDisciplinas = this.disciplinaStorage.take()
        .map(this.buildUniversidadeEntity())
        .map(this.buildUnidadeEntity())
        .map(this.buildCursoEntity())
        .map(this.buildTurmaEntity())
      this.getEventosByUsuario()
    }
  }

  getEventosByUsuario() {
    this.eventoStorage.requestByUsuario().then(
      this.getEventosByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getEventosByUsuarioSuccess() {
    return () => {
      this.permEventos = this.eventoStorage.take()
        .map(this.buildUniversidadeEntity())
        .map(this.buildUnidadeEntity())
        .map(this.buildCursoEntity())
        .map(this.buildTurmaEntity())
        .map(this.buildDisciplinaEntity())
      console.log(this.permEventos)
    }
  }

  //
  // Entity Builders
  //
  buildUniversidadeEntity() {
    return entity => Object.assign(entity,
      { universidade: this.universidadeStorage.getById(entity.idUniversidade) })
  }

  buildUnidadeEntity() {
    return entity => Object.assign(entity,
      { unidade: this.unidadeStorage.getById(entity.idUnidade) })
  }

  buildCursoEntity() {
    return entity => Object.assign(entity,
      { curso: this.cursoStorage.getById(entity.idCurso) })
  }

  buildTurmaEntity() {
    return entity => Object.assign(entity,
      { turma: this.turmaStorage.getById(entity.idTurma) })
  }

  buildDisciplinaEntity() {
    return entity => Object.assign(entity,
      { disciplina: this.disciplinaStorage.getById(entity.idDisciplina) })
  }

  watchPerm(name) {
    return data => { this[name] = data }
  }

  ////
  // Filtro
  ////
  toggleFilterFormVisibility() {
    this.filterVisibility = !this.filterVisibility
  }
}
