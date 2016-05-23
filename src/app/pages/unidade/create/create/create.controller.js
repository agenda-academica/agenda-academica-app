export default class UnidadeCreateController {
  constructor($scope, $mdDialog, $location, auth, universidadeStorage, unidadeStorage, errorHandler) {
    'ngInject'
    this.$scope         = $scope
    this.$mdDialog      = $mdDialog
    this.$location      = $location
    this.authService    = auth
    this.universidadeStorage = universidadeStorage
    this.unidadeStorage = unidadeStorage
    this.errorHandler   = errorHandler

    this.unidadeForm = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((unidade) => {
        this.$location.path(`/curso/create/${unidade.idUniversidade}/${unidade.id}`)
      })
    )
  }

  submitOutsideForm() {
    let childScope = this.$scope.$parent.$$childTail.$$childTail
    if (childScope.create.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendCreateRequest(
      this.getCreateSuccessCallback(() => {
        this.$location.path('/unidade')
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data            = angular.copy(this.unidadeForm)
    data.idUsuario      = this.authService.get().id
    data.idUniversidade = data.universidade.id

    this.unidadeStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.unidadeStorage.getLast())
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
