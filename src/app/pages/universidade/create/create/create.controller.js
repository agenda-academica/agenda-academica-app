export default class CreateUniversidadeController {
  constructor($scope, $mdDialog, $location, auth, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$location = $location
    this.authService = auth
    this.universidadeStorage = universidadeStorage
    this.errorHandler = errorHandler

    this.universidadeForm = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((universidade) => {
        this.$location.path(`/unidade/create/${universidade.id}`)
      })
    )
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.createUniversidade.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendCreateRequest(
      this.getCreateSuccessCallback(() => {
        this.$location.path('/universidade')
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data = angular.copy(this.universidadeForm)
    data.idUsuario = this.authService.get().id

    this.universidadeStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.universidadeStorage.getLast())
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
