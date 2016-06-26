export default class QuadroHorarioController {
  constructor(
    $routeParams,
    moment,
    diasSemana,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    disciplinaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$routeParams        = $routeParams
    this.moment              = moment
    this.diasSemana          = diasSemana
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.disciplinaStorage   = disciplinaStorage
    this.errorHandler        = errorHandler

    this.tabsSelectedIndex = $routeParams.diaSemana || moment().day()
    this.initStorageRequests()
  }

  initStorageRequests() {
    this.getUniversidadeByUsuario()
  }

  getUniversidadeByUsuario() {
    this.universidadeStorage.requestByUsuario().then(
      () => { this.getUnidadesByUsuario() },
      this.errorHandler.request()
    )
  }

  getUnidadesByUsuario() {
    this.unidadeStorage.requestByUsuario().then(
      () => { this.getCursosByUsuario() },
      this.errorHandler.request()
    )
  }

  getCursosByUsuario() {
    this.cursoStorage.requestByUsuario().then(
      () => { this.getTurmasByUsuario() },
      this.errorHandler.request()
    )
  }

  getTurmasByUsuario() {
    this.turmaStorage.requestByUsuario().then(
      () => { this.getDisciplinasByUsuario() },
      this.errorHandler.request()
    )
  }

  getDisciplinasByUsuario() {
    this.disciplinaStorage.requestByUsuario().then(
      this.getDisciplinasByUsuarioSuccess(),
      this.errorHandler.request()
    )
  }

  getDisciplinasByUsuarioSuccess() {
    return () => {
      let quadros = this
        .disciplinaStorage.take()
        .map(this.normalizeQuadroHorarioEntities())

      this.buildQuadroHorarioEntities(quadros)
    }
  }

  normalizeQuadroHorarioEntities() {
    return disciplina => {
      return {
        universidade: this.universidadeStorage.getById(disciplina.idUniversidade),
        unidade: this.unidadeStorage.getById(disciplina.idUnidade),
        curso: this.cursoStorage.getById(disciplina.idCurso),
        turma: this.turmaStorage.getById(disciplina.idTurma),
        disciplina: this.disciplinaStorage.getById(disciplina.id),
        diaSemana: disciplina.diaSemana
      }
    }
  }

  buildQuadroHorarioEntities(quadros) {
    this.diasSemana.getDays().forEach((day, index) => {
      let dayIndex = this.diasSemana[day.key.toUpperCase()]

      this[day.key] = quadros
        .filter(this.disciplinaStorage.filterByDiaSemanaIndex(dayIndex))
        .map(this.formatHorario())
      this[day.key].index = dayIndex
    })
  }

  formatHorario() {
    return quadro => {
      let horaInicio = this
        .moment(quadro.disciplina.horaInicio, 'HH:mm:ss')
        .format('HH[h]ss')

      let horaFim = this
        .moment(quadro.disciplina.horaFim, 'HH:mm:ss')
        .format('HH[h]ss')

      quadro.horario = `${horaInicio} - ${horaFim}`
      return quadro
    }
  }

  onSwipeLeft() {
    if (this.tabsSelectedIndex === 6) this.tabsSelectedIndex = 0
    else this.tabsSelectedIndex++
  }

  onSwipeRight() {
    if (this.tabsSelectedIndex === 0) this.tabsSelectedIndex = 6
    else this.tabsSelectedIndex--
  }
}
