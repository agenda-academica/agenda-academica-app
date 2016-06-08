export default class CursoUpdateFormController {
  constructor($scope, $routeParams, $mdDialog, $location, cursoStorage, errorHandler) {
    'ngInject'
    this.$scope       = $scope
    this.$routeParams = $routeParams
    this.$mdDialog    = $mdDialog
    this.$location    = $location

    this.cursoStorage = cursoStorage
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
        desta unidade?`)
      .ariaLabel('Excluir unidade')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let options = {id: this.$routeParams.id}
      this.cursoStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => { this.$location.path('/curso') })
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados da unidade foram excluídos com sucesso.`)
      .ok('Obrigado')
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados da unidade continuam
            intactos.`)
          .ok('Obrigado')
      )
    }
  }
}
