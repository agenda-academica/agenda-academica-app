export default class DisciplinaUpdateController {
  constructor(
    $scope,
    $mdDialog, $routeParams,
    $location,
    moment,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    disciplinaStorage,
    errorHandler,
    disciplina
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.moment              = moment
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
    this.disciplinaStorage   = disciplinaStorage
    this.errorHandler        = errorHandler

    ////
    // Form
    ////
    this.form = {}

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
  }

  initStorageRequests() {
    let hasStorages = this.universidadeStorage.has()
      && this.unidadeStorage.has()
      && this.cursoStorage.has()
      && this.turmaStorage.has()
      && this.disciplinaStorage.has()

    if (!hasStorages)
      this.universidadeStorage.requestByUsuario().then(
        this.requestUniversidadeByUsuarioSuccess(),
        this.errorHandler.request()
      )
    else
      this.init()()
  }

  requestUniversidadeByUsuarioSuccess() {
    return () => {
      this.unidadeStorage.requestByUsuario().then(
        this.requestUnidadesByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestUnidadesByUsuarioSuccess() {
    return () => {
      this.cursoStorage.requestByUsuario().then(
        this.requestCursosByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestCursosByUsuarioSuccess() {
    return () => {
      this.turmaStorage.requestByUsuario().then(
        this.requestTurmasByUsuarioSuccess(),
        this.errorHandler.request()
      )
    }
  }

  requestTurmasByUsuarioSuccess() {
    return () => {
      this.disciplinaStorage.requestByUsuario().then(
        this.init(),
        this.errorHandler.request()
      )
    }
  }

  init() {
    return () => {
      // Universidade
      let idUniversidade = this.$routeParams.idUniversidade
      this.universidades = this.universidadeStorage.take()
      this.universidadeSelectedIndex = this.universidadeStorage.getIndexOf(idUniversidade)

      // Unidade
      let idUnidade = this.$routeParams.idUnidade
      let unidadeFilter = this.unidadeStorage.filterByIdUniversidade(idUniversidade)
      let unidadeIndex = this.unidadeStorage.findIndexById(idUnidade)

      this.unidades = this.unidadeStorage.take().filter(unidadeFilter)
      this.unidadeSelectedIndex = this.unidades.findIndex(unidadeIndex)

      // Curso
      let idCurso = this.$routeParams.idCurso
      let cursoFilter = this.cursoStorage.filterByIdUnidade(idUnidade)
      let cursoIndex = this.cursoStorage.findIndexById(idCurso)
      this.cursos = this.cursoStorage.take().filter(cursoFilter)
      this.cursoSelectedIndex = this.cursos.findIndex(cursoIndex)

      // Turma
      let idTurma = this.$routeParams.idTurma
      let turmaFilter = this.turmaStorage.filterByIdCurso(idCurso)
      let turmaIndex = this.turmaStorage.findIndexById(idTurma)
      this.turmas = this.turmaStorage.take().filter(turmaFilter)
      this.turmaSelectedIndex = this.turmas.findIndex(turmaIndex)

      // Disciplina
      const timeFormat = 'HH:mm:ss'
      this.form = this.disciplinaStorage.getById(this.$routeParams.id)
      this.form.horaInicio = this.moment(this.form.horaInicio, timeFormat).toDate()
      this.form.horaFim = this.moment(this.form.horaFim, timeFormat).toDate()

      let valid = !!this.form
        && this.universidadeSelectedIndex !== -1
        && this.unidadeSelectedIndex !== -1
        && this.cursoSelectedIndex !== -1
        && this.turmaSelectedIndex !== -1

      if (!valid) this.$location.path(`/quadro-horario/dia/${this.form.diaSemana}`)
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.update.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendUpdateRequest()
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }

  sendUpdateRequest() {
    let data = angular.copy(this.form)
    let options = { id: data.id }
    data.horaInicio = this.moment(data.horaInicio).format('HH:mm:ss').toString()
    data.horaFim = this.moment(data.horaFim).format('HH:mm:ss').toString()

    this.disciplinaStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    const { diaSemana } = this.form
    return () => { this.$location.path(`/quadro-horario/dia/${diaSemana}`) }
  }
}
