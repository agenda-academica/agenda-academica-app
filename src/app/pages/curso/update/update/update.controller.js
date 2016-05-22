export default class CursoUpdateController {
  constructor(
    $scope,
    $mdDialog, $routeParams,
    $location,
    auth,
    universidadeStorage,
    unidadeStorage,
    cursoStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.authService         = auth
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage      = unidadeStorage
    this.cursoStorage        = cursoStorage
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
    this.permUniversidades = []
    this.permUnidades      = []
    this.permCursos        = []
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
      this.universidadeSelectedIndex = this.universidadeStorage
        .getIndexOf(idUniversidade)

      // Unidade
      let idUnidade = this.$routeParams.idUnidade
      this.unidades = this.unidadeStorage.take()
        .filter(this.unidadeStorage.filterByIdUniversidade(idUniversidade))
      this.unidadeSelectedIndex = this.unidades
        .findIndex(this.unidadeStorage.findIndexById(idUnidade))

      // Curso
      this.form = this.cursoStorage.getById(this.$routeParams.id)

      let valid = !!this.form
        && this.universidadeSelectedIndex !== -1
        && this.unidadeSelectedIndex !== -1

      if (!valid) this.$location.path('/curso')
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

    this.cursoStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => { this.$location.path('/curso') }
  }
}
