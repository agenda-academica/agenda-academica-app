export default class PeriodoLetivoUpdateFormController {
  constructor($routeParams, $mdDialog, $location, periodoLetivoStorage, errorHandler, $scope) {
    'ngInject'
    this.myDate = new Date();
    this.minDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth() - 2,
      this.myDate.getDate());
    this.maxDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth() + 2,
      this.myDate.getDate());
    this.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    };

    this.$routeParams = $routeParams
    this.$mdDialog    = $mdDialog
    this.$location    = $location

    this.periodoLetivoStorage = periodoLetivoStorage
    this.errorHandler        = errorHandler

    alert($scope.parent.periodoLetivoForm.dataFim);
    console.log(typeof $scope.parent.periodoLetivoForm.dataFim)
  }

  ////
  // As funcionalidades de `update` ficaram centralizadas
  // no componente principal em `periodoLetivo/update/update`,
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
        desta periodoLetivo?`)
      .ariaLabel('Excluir periodoLetivo')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let options = {id: this.$routeParams.id}
      this.periodoLetivoStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => { this.$location.path('/periodo-letivo') })
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados da periodoLetivo foram excluídos com sucesso.`)
      .ok('Obrigado')
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados da periodo Letivo continuam
            intactos.`)
          .ok('Obrigado')
      )
    }
  }
}
