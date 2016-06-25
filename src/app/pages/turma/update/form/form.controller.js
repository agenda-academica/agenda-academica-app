export default class TurmaUpdateFormController {
  constructor(
    $scope,
    $routeParams,
    $mdDialog,
    $location,
    turmaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope       = $scope
    this.$routeParams = $routeParams
    this.$mdDialog    = $mdDialog
    this.$location    = $location

    this.turmaStorage = turmaStorage
    this.errorHandler = errorHandler
  }

  ////
  // As funcionalidades de `update` ficaram centralizadas
  // no componente principal em `curso/update/update`,
  // devido à dependência de submit do form através de um botão
  // externo. e.g. `submitOutsideForm()`
  ////

  delete() {
    let confirm = this.getDeleteConfirmDialog()

    this.$mdDialog.show(confirm)
      .then(
        this.getDeleteOkCallback(),
        this.getDeleteCancelCallback()
      )
  }

  getDeleteConfirmDialog() {
    return this.$mdDialog.confirm()
      .title('Atenção!')
      .textContent(`Tem certeza que deseja excluir permanentemente os dados
        desta turma?`)
      .ariaLabel('Excluir turma')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let options = {id: this.$routeParams.id}
      this.turmaStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => { this.$location.path('/turma') })
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados da turma foram excluídos com sucesso.`)
      .ok('Obrigado')
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados da turma continuam intactos.`)
          .ok('Obrigado')
      )
    }
  }
}
