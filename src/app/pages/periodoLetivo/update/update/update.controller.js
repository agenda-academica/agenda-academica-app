export default class UpdatePeriodoLetivoController {
  constructor(
    $scope,
    $mdDialog,
    $routeParams,
    $location,
    moment,
    usuarioAuth,
    periodoLetivoStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.usuarioAuth         = usuarioAuth
    this.periodoLetivoStorage = periodoLetivoStorage
    this.errorHandler        = errorHandler
    this.moment = moment

    this.periodoLetivoForm = {}
    this.initStorageRequests()
  }

  initStorageRequests() {

    if (!this.periodoLetivoStorage.has())
      this.periodoLetivoStorage
        .requestByUsuario()
        .then(
          this.requestPeriodoLetivosByUsuarioSuccess(
            this.init()
          ),
          this.errorHandler.request()
        )
    else
      this.init()()
  }

  requestPeriodosLetivosByUsuarioSuccess(initCallback) {
    return () => { initCallback() }
  }

  init() {
    return () => {
      this.periodoLetivoForm = this
        .periodoLetivoStorage
        .getById(this.$routeParams.id)

        this.periodoLetivoForm

        const dateFormat = 'YYYY-MM-DD'
      this.form = this.periodoLetivoStorage.getById(this.$routeParams.id)
      this.form.dataInicio = this.moment(this.form.dataInicio, dateFormat).toDate()
      this.form.dataFim = this.moment(this.form.dataFim, dateFormat).toDate()

      if (!this.periodoLetivoForm) this.$location.path('/periodo-letivo')
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {


    let childScope = this.$scope.$parent.$$childTail.$$childTail
    // if (childScope.updatePeriodoLetivo.$invalid) {
    //   this.$mdDialog.show(this.getPreenchimentoAlert())
    //   return
    // }



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
    let data    = angular.copy(this.periodoLetivoForm)
    let options = {id: data.id}
    data.idUsuario = this.usuarioAuth.take().id
    data.idUniversidade = this.periodoLetivoForm.idUniversidade

    data.dataInicio = this.moment(data.dataInicio).format('YYYY-MM-DD')

    data.dataFim = this.moment(data.dataFim).format('YYYY-MM-DD')

    this.periodoLetivoStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => {
      this.$location.path(`/periodo-letivo/${this.$routeParams.idUniversidade}`)
    }
   }


}
