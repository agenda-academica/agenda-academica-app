/*
classe controller TWO WAY DATA BINDING (ALTERAR AQUI, ALTERA NO FORM, ALTERAR
LA, ALTERA AQUI)
*/

export default class TurmaCreateController {
  constructor($scope, $mdDialog, $location, usuarioAuth, turmaStorage, errorHandler) {
    'ngInject'
    this.$scope       = $scope
    this.$mdDialog    = $mdDialog
    this.$location    = $location
    this.usuarioAuth  = usuarioAuth
    this.turmaStorage = turmaStorage
    this.errorHandler = errorHandler

    this.form = {}
  }

  submit() {
    this.sendCreateRequest(
      this.getCreateSuccessCallback((turma) => {
        this.$location.path(
          '/disciplina/create'
            .concat(`/${turma.idUniversidade}`)
            .concat(`/${turma.idUnidade}`)
            .concat(`/${turma.idCurso}`)
            .concat(`/${turma.id}`)
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
        this.$location.path('/turma')
      })
    )
  }

  sendCreateRequest(successCallback) {
    let data            = angular.copy(this.form)
    data.idUsuario      = this.usuarioAuth.take().id
    data.idUniversidade = data.universidade.id
    data.idUnidade      = data.unidade.id
    data.idCurso        = data.curso.id

    this.turmaStorage.create(data).then(
      successCallback(data),
      this.errorHandler.request()
    )
  }

  getCreateSuccessCallback(callback) {
    return (data) => {
      return () => {
        callback(this.turmaStorage.getLast())
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
