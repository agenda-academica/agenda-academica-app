export default class UserEditController {
  constructor($mdDialog, auth) {
    'ngInject'
    this.$mdDialog = $mdDialog

    this.user    = auth.get()
    this.nome    = this.user.name
    this.celular = this.user.phone
    this.email   = this.user.email
    this.login   = this.user.login
  }

  submit() {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .title('Erro ):')
        .textContent(`Ops! Algo inesperado aconteceu. Aguarde um instante e
          tente novamente.`)
        .ok('Ok')
    )
  }

  delete() {
    let dialog = this.$mdDialog
    let confirm = dialog.confirm()
          .title('Atenção?')
          .textContent(`Tem certeza que deseja excluir permanentemente seu
            cadastro, juntamente com todos os dados inseridos até hoje?`)
          .ariaLabel('Excluir cadastro')
          .ok('Sim.')
          .cancel('Não, por favor!');
    dialog.show(confirm).then(function() {
      dialog.show(
        dialog.alert()
          .title('Adeus ):')
          .textContent(`Seu cadastro foi excluído com sucesso.`)
          .ok('Obrigado')
      )
    }, function() {
      dialog.show(
        dialog.alert()
          .title('Obrigado por continuar conosco (:')
          .textContent(`Fique tranquilo, seus dados continuam intactos.`)
          .ok('Ufa, que bom (:')
      )
    });
  }
}
