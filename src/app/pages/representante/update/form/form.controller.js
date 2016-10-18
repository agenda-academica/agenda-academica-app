export default class RepresentanteUpdateFormController {
  constructor($routeParams, $mdDialog, $location, representanteStorage, errorHandler, $scope) {
    'ngInject'


    this.$routeParams = $routeParams
    this.$mdDialog    = $mdDialog
    this.$location    = $location

    this.representanteStorage = representanteStorage
    this.errorHandler        = errorHandler

  }

  ////
  // As funcionalidades de `update` ficaram centralizadas
  // no componente principal em `representante/update/update`,
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
        desta representante?`)
      .ariaLabel('Excluir representante')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let options = {id: this.$routeParams.id}
      this.representanteStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => {
const { idUniversidade, idUnidade, idCurso, idTurma} = this.$routeParams
         this.$location.path(`/representante/${idUniversidade}/${idUnidade}/${idCurso}/${idTurma}`)
      })
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados do representante foram excluídos com sucesso.`)
      .ok('Obrigado')
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados do representante continuam
            intactos.`)
          .ok('Obrigado')
      )
    }
  }



}
