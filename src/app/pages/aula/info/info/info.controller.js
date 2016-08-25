import usjtLogoImage from '../../../disciplina/read/usjt.jpg'
import provas from './provas.json'
import trabalhos from './trabalhos.json'
import eventos from './eventos.json'
import materiais from './materiais.json'

export default class AulaInfoController {
  constructor(
    $q,
    $routeParams,
    $location,
    universidade,
    unidade,
    curso,
    turma,
    disciplina,
    errorHandler
  ) {
    this.$q = $q
    this.$routeParams = $routeParams
    this.$location = $location

    this.universidadeService = universidade
    this.unidadeService = unidade
    this.cursoService = curso
    this.turmaService = turma
    this.disciplinaService = disciplina
    this.errorHandler = errorHandler

    this.temporaryUsjtLogoImage = usjtLogoImage
    this.universidade = {}
    this.unidade = {}
    this.curso = {}
    this.turma = {}
    this.disciplina = {}
    this.provas = provas
    this.trabalhos = trabalhos
    this.eventos = eventos
    this.materiais = materiais

    this.fetch()
  }

  fetch() {
    this.getUniversidadeById()
    this.getUnidadeById()
    this.getCursoById()
    this.getTurmaById()
    this.getDisciplinaById()
  }

  //
  // Universidade
  //
  getUniversidadeById() {
    let deferred = this.$q.defer()
    this.universidadeService
      .api.root.show({ id: this.$routeParams.idUniversidade })
      .$promise.then(
        this.getUniversidadeByIdSuccess(deferred),
        this.errorHandler.request()
      )
  }

  getUniversidadeByIdSuccess(deferred) {
    return universidade => {
      if (universidade.requestStatus === 'true') {
        this.universidade = universidade
        deferred.resolve()
      }
      deferred.reject('Error: AulaInfoController Get Universidade By Id Request.')
    }
  }

  //
  // Unidade
  //
  getUnidadeById() {
    let deferred = this.$q.defer()
    this.unidadeService
      .api.root.show({ id: this.$routeParams.idUnidade })
      .$promise.then(
        this.getUnidadeByIdSuccess(deferred),
        this.errorHandler.request()
      )
  }

  getUnidadeByIdSuccess(deferred) {
    return unidade => {
      if (unidade.requestStatus === true) {
        this.unidade = unidade
        deferred.resolve()
      }
      deferred.reject('Error: AulaInfoController Get Unidade By Id Request.')
    }
  }

  //
  // Curso
  //
  getCursoById() {
    let deferred = this.$q.defer()
    this.cursoService
      .api.root.show({ id: this.$routeParams.idCurso })
      .$promise.then(
        this.getCursoByIdSuccess(deferred),
        this.errorHandler.request()
      )
  }

  getCursoByIdSuccess(deferred) {
    return curso => {
      if (curso.requestStatus === true) {
        this.curso = curso
        deferred.resolve()
      }
      deferred.reject('Error: AulaInfoController Get Curso By Id Request.')
    }
  }

  //
  // Turma
  //
  getTurmaById() {
    let deferred = this.$q.defer()
    this.turmaService
      .api.root.show({ id: this.$routeParams.idTurma })
      .$promise.then(
        this.getTurmaByIdSuccess(deferred),
        this.errorHandler.request()
      )
  }

  getTurmaByIdSuccess(deferred) {
    return turma => {
      if (turma.requestStatus === true) {
        this.turma = turma
        deferred.resolve()
      }
      deferred.reject('Error: AulaInfoController Get Turma By Id Request.')
    }
  }

  //
  // Disciplina
  //
  getDisciplinaById() {
    let deferred = this.$q.defer()
    this.disciplinaService
      .api.root.show({ id: this.$routeParams.id })
      .$promise.then(
        this.getDisciplinaByIdSuccess(deferred),
        this.errorHandler.request()
      )
  }

  getDisciplinaByIdSuccess(deferred) {
    return disciplina => {
      if (disciplina.requestStatus === true) {
        this.disciplina = disciplina
        deferred.resolve()
      }
      deferred.reject('Error: AulaInfoController Get Disciplina By Id Request.')
    }
  }

  //
  // Redirects
  //
  redirUniversidadeUpdate() {
    const { idUniversidade } = this.$routeParams
    this.$location.path(`/universidade/update/${idUniversidade}/`)
  }
  redirUnidadeUpdate() {
    const { idUniversidade, idUnidade } = this.$routeParams
    this.$location.path(`/unidade/update/${idUniversidade}/${idUnidade}`)
  }
  redirCursoUpdate() {
    const { idUniversidade, idUnidade, idCurso } = this.$routeParams
    this.$location.path(`/curso/update/${idUniversidade}/${idUnidade}/${idCurso}`)
  }
  redirTurmaUpdate() {
    const { idUniversidade, idUnidade, idCurso, idTurma } = this.$routeParams
    this.$location.path(`/turma/update/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
  }
  redirDisciplinaUpdate() {
    const { idUniversidade, idUnidade, idCurso, idTurma, id } = this.$routeParams
    this.$location.path(`/disciplina/update/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}/${id}`)
  }
}
