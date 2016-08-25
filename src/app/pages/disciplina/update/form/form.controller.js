export default class DisciplinaUpdateFormController {
  constructor(
    $scope,
    $routeParams,
    $mdDialog,
    $location,
    diasSemana,
    disciplinaStorage,
    errorHandler
  ) {
    'ngInject'
    this.$scope = $scope
    this.$routeParams = $routeParams
    this.$mdDialog = $mdDialog
    this.$location = $location
    this.diasSemanaService = diasSemana

    this.disciplinaStorage = disciplinaStorage
    this.errorHandler = errorHandler

    this.dias = this.diasSemanaService.getDays()
  }

  ////
  // As funcionalidades de `update` ficaram centralizadas
  // no componente principal em `disciplina/update/update`,
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
        desta disciplina?`)
      .ariaLabel('Excluir disciplina')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let options = {id: this.$routeParams.id}
      this.disciplinaStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => { this.$location.path('/disciplina') })
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados da disciplina foram excluídos com sucesso.`)
      .ok('Obrigado')
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados da disciplina continuam intactos.`)
          .ok('Obrigado')
      )
    }
  }
}
