export default class ErrorHandlerService {
  constructor($mdDialog) {
    'ngInject'
    this.$mdDialog = $mdDialog
  }

  request() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Erro ):')
          .textContent(`Ops! Algo inesperado aconteceu. Aguarde um instante e
            tente novamente.`)
          .ok('Ok')
          .targetEvent(this.originatorEv)
      )
    }
  }
}
