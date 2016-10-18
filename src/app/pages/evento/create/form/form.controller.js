export default class EventoCreateFormController {
  constructor(
    $scope,
    $location,
    $routeParams,
    diasSemana,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    disciplinaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$location           = $location
    this.$routeParams        = $routeParams
    this.diasSemanaService   = diasSemana

    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.disciplinaStorage   = disciplinaStorage
    this.errorHandler        = errorHandler

    this.permUnidades     = []
    this.permCursos       = []
    this.permTurmas       = []
    this.permDisciplinas  = []

    this.universidades    = []
    this.unidades         = []
    this.cursos           = []
    this.turmas           = []
    this.disciplinas      = []

    this.diasSemana       = this.diasSemanaService.getDays()
    this.currentDiaSemana = this.$routeParams.diaSemana

    this.tipos = ['Prova', 'Trabalho', 'Outros']

    this.initStorageRequests()

    this.$scope.$watch(() => this.parent.form.universidade, this.watchUniversidadeSelect())
    this.$scope.$watch(() => this.parent.form.unidade, this.watchUnidadeSelect())
    this.$scope.$watch(() => this.parent.form.curso, this.watchCursoSelect())
    this.$scope.$watch(() => this.parent.form.turma, this.watchTurmaSelect())

    this.$scope.$watch(() => this.permUnidades, this.filterUnidades())
    this.$scope.$watch(() => this.permCursos, this.filterCursos())
    this.$scope.$watch(() => this.permTurmas, this.filterTurmas())
    this.$scope.$watch(() => this.permDisciplinas, this.filterDisciplinas())
  }

  watchUniversidadeSelect() { return universidade => this.filterUnidades(universidade) }
  watchUnidadeSelect() { return unidade => this.filterCursos(unidade) }
  watchCursoSelect() { return curso => this.filterTurmas(curso) }
  watchTurmaSelect() { return turma => this.filterDisciplinas(turma) }

  filterUnidades(universidade) {
    this.unidades = this.permUnidades.filter(unidade => unidade.idUniversidade === universidade.id)
    this.hasUnidades = this.unidades.length
  }
  filterCursos(unidade) {
    this.cursos = this.permCursos.filter(curso => curso.idUnidade === unidade.id)
    this.hasCursos = this.cursos.length
  }
  filterTurmas(curso) {
    this.turmas = this.permTurmas.filter(turma => turma.idCurso === curso.id)
    this.hasTurmas = this.turmas.length
  }
  filterDisciplinas(turma) {
    this.disciplinas = this.permDisciplinas.filter(disciplina => disciplina.idTurma === turma.id)
    this.hasDisciplinas = this.disciplinas.length
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
      this.hasUniversidades = !!this.universidades.length
      let idUniversidade = this.$routeParams.idUniversidade

      if (idUniversidade) {
        this.currentUniversidade      = this.universidadeStorage.getById(idUniversidade)
        this.currentUniversidadeIndex = this.universidadeStorage.getIndexOf(idUniversidade)
        this.hasUniversidadeId        = this.currentUniversidadeIndex !== -1
        this.hasUniversidades         = true
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

      // Disciplinas
      this.disciplinaStorage.requestByUsuario().then(
        this.requestDisciplinasByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestDisciplinasByUsuarioSuccess() {
    return () => {
      this.permDisciplinas = this.disciplinaStorage.take()
      let idDisciplina     = this.$routeParams.idDisciplina

      if (idDisciplina) {
        let disciplinaIndexCallback = this.disciplinaStorage.findIndexById(idDisciplina)
        this.filterDisciplinas(this.currentTurma)
        this.currentDisciplina      = this.disciplinaStorage.getById(idDisciplina)
        this.currentDisciplinaIndex = this.disciplinas.findIndex(disciplinaIndexCallback)
        this.hasDisciplinaId        = this.currentDisciplinaIndex !== -1
        this.hasDisciplinas         = true
      }
    }
  }

  ////
  // Create Redirects
  ////
  getUniversidadeCreateRedirect() {
    this.$location.path('/universidade/create')
  }
  getUnidadeCreateRedirect() {
    const { universidade } = this.parent.form
    this.$location.path(`/unidade/create/${universidade.id}`)
  }
  getCursoCreateRedirect() {
    const { universidade, unidade } = this.parent.form
    this.$location.path(`/curso/create/${universidade.id}/${unidade.id}`)
  }
  getTurmaCreateRedirect() {
    const { universidade, unidade, curso } = this.parent.form
    this.$location.path(`/turma/create/${universidade.id}/${unidade.id}/${curso.id}`)
  }
  getDisciplinaCreateRedirect() {
    const { universidade, unidade, curso, turma } = this.parent.form
    this.$location.path(
      `/disciplina/create/${universidade.id}/${unidade.id}/${curso.id}/${turma.id}`
    )
  }
}
