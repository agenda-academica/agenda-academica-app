export default class DisciplinaCreateFormController {
  constructor(
    $scope,
    $routeParams,
    diasSemana,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$routeParams        = $routeParams
    this.diasSemanaService   = diasSemana
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.errorHandler        = errorHandler

    this.permUnidades     = []
    this.permCursos       = []
    this.permTurmas       = []
    this.universidades    = []
    this.unidades         = []
    this.cursos           = []
    this.turmas           = []
    this.diasSemana       = this.diasSemanaService.getDays()
    this.currentDiaSemana = this.$routeParams.diaSemana
    this.initStorageRequests()

    this.$scope.$watch(() => this.parent.form.universidade, this.watchUniversidadeSelect())
    this.$scope.$watch(() => this.parent.form.unidade, this.watchUnidadeSelect())
    this.$scope.$watch(() => this.parent.form.curso, this.watchCursoSelect())
    this.$scope.$watch(() => this.permUnidades, this.filterUnidades())
    this.$scope.$watch(() => this.permCursos, this.filterCursos())
    this.$scope.$watch(() => this.permTurmas, this.filterTurmas())
  }

  watchUniversidadeSelect() {
    return universidade => this.filterUnidades(universidade)
  }

  watchUnidadeSelect() {
    return unidade => this.filterCursos(unidade)
  }

  watchCursoSelect() {
    return curso => this.filterTurmas(curso)
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

  filterTurmas(curso) {
     this.turmas = this.permTurmas.filter((turma) =>
      turma.idCurso === curso.id
    )
    this.hasTurmas = this.turmas.length
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
        this.currentUnidade = this.unidadeStorage.getById(idUnidade)
        this.currentUnidadeIndex = this.unidades
          .findIndex(this.unidadeStorage.findIndexById(idUnidade))
        this.hasUnidadeId        = this.currentUnidadeIndex !== -1
        this.hasUnidades         = true
      }

      // Cursos
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
        this.currentCurso      = this.cursoStorage.getById(idCurso)
        this.currentCursoIndex = this.cursos.findIndex(this.cursoStorage.findIndexById(idCurso))
        this.hasCursoId        = this.currentCursoIndex !== -1
        this.hasCursos         = true
      }

      // Turmas
      this.turmaStorage.requestByUsuario().then(
        this.requestTurmasByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestTurmasByUsuarioSuccess() {
    return () => {
      this.permTurmas = this.turmaStorage.take()
      let idTurma     = this.$routeParams.idTurma

      if (idTurma) {
        let turmaIndexCallback = this.turmaStorage.findIndexById(idTurma)
        this.filterTurmas(this.currentCurso)
        this.currentTurma      = this.turmaStorage.getById(idTurma)
        this.currentTurmaIndex = this.turmas.findIndex(turmaIndexCallback)
        this.hasTurmaId        = this.currentTurmaIndex !== -1
        this.hasTurmas         = true
      }
    }
  }
}
