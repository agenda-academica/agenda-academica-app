export default class UpdateRepresentanteController {
  constructor(
    $scope,
    $mdDialog,
    $routeParams,
    $location,
    moment,
    usuarioAuth,
    representanteStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope              = $scope
    this.$mdDialog           = $mdDialog
    this.$routeParams        = $routeParams
    this.$location           = $location
    this.usuarioAuth         = usuarioAuth
    this.representanteStorage = representanteStorage
    this.errorHandler        = errorHandler
    this.moment = moment

    this.representanteForm = {}
    this.initStorageRequests()
  }

  initStorageRequests() {

    if (!this.representanteStorage.has())
      this.representanteStorage
        .requestByUsuario()
        .then(
          this.requestRepresentantesByUsuarioSuccess(
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
      this.representanteForm = this
        .representanteStorage
        .getById(this.$routeParams.id)

        const { idUniversidade, idUnidade, idCurso, idTurma} = this.$routeParams


/*todo: teste
      this.representanteForm
      this.form = this.representanteStorage.getById(this.$routeParams.id)
      this.form.dataInicio = this.moment(this.form.dataInicio, dateFormat).toDate()
      this.form.dataFim = this.moment(this.form.dataFim, dateFormat).toDate()
*/
      if (!this.representanteForm) this.$location.path(`/representante/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
    }
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {


    let childScope = this.$scope.$parent.$$childTail.$$childTail
    // if (childScope.updateRepresentante.$invalid) {
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
    let data    = angular.copy(this.representanteForm)
    let options = {id: data.id}
    data.idUsuario = this.usuarioAuth.take().id
    data.idTurma = this.representanteForm.idTurm

    this.representanteStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => {

        const { idUniversidade, idUnidade, idCurso, idTurma} = this.$routeParams

      this.$location.path(`/representante/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
    }
   }






}
