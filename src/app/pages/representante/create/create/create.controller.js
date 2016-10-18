export default class CreateRepresentanteController {
  constructor(
    $scope,
    $mdDialog,
    $location,
    usuarioAuth,
    representanteStorage,
    errorHandler,
    moment,
    $routeParams
  ) {
    'ngInject'
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$location = $location
    this.usuarioAuth = usuarioAuth
    this.representanteStorage = representanteStorage
    this.errorHandler = errorHandler
    this.moment = moment
    this.$routeParams = $routeParams

    this.representanteForm = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((representante) => {
        this.$location.path(`/representante/create/${this.$routeParams.idTurma}`)
      })
    )
  }

  submitOutsideForm() {

    const { idUniversidade, idUnidade, idCurso, idTurma } = this.$routeParams



    //todo: aqui
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.create.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }


    this.sendCreateRequest(
      this.getCreateSuccessCallback(() => {
         this.$location.path(`/representante/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
        //this.$location.path(`/representante/${this.$routeParams.idUniversidade}`)
      })
    )

  }

  //METODO CREATE, TEM Q SER ARRUMADO
  sendCreateRequest(successCallback) {
    let data = angular.copy(this.representanteForm)
    data.idUsuario = this.usuarioAuth.take().id


    this.representanteStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.representanteStorage.getLast())
      }
    }
  }

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }
}
