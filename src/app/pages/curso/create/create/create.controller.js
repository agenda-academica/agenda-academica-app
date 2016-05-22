export default class CursoCreateController {
  constructor($scope, $mdDialog, $location, auth, cursoStorage, errorHandler) {
    'ngInject'
    this.$scope       = $scope
    this.$mdDialog    = $mdDialog
    this.$location    = $location
    this.authService  = auth
    this.cursoStorage = cursoStorage
    this.errorHandler = errorHandler

    this.form = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((curso) => {
        this.$location.path(
          '/turma/create'
            .concat(`/${curso.idUniversidade}`)
            .concat(`/${curso.idUnidade}`)
            .concat(`/${curso.id}`)
        )
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
        this.$location.path('/curso')
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data            = angular.copy(this.form)
    data.idUsuario      = this.authService.get().id
    data.idUniversidade = data.universidade.id
    data.idUnidade      = data.unidade.id

    this.cursoStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.cursoStorage.getLast())
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
