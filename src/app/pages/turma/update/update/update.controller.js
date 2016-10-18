export default class TurmaUpdateController {
  constructor(
    $scope,
    $mdDialog, $routeParams,
    $location,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    turmaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
    this.turmaStorage        = turmaStorage
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
        this.requestUnidadesByUsuarioSuccess(this.init()),
        this.errorHandler.request()
      )
    }
  }

  requestUnidadesByUsuarioSuccess(initCallback) {
    return () => {
      this.cursoStorage.requestByUsuario().then(
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
      this.form = this.turmaStorage.getById(this.$routeParams.id)

      let valid = !!this.form
        && this.universidadeSelectedIndex !== -1
        && this.unidadeSelectedIndex !== -1
        && this.cursoSelectedIndex !== -1

      if (!valid) this.$location.path('/turma')
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
    let data    = angular.copy(this.form)
    let options = {id: data.id}

    this.turmaStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => { this.$location.path('/turma') }
  }


}
