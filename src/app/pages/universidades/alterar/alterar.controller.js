export default class AlterarUniversidadesController {
  constructor($mdDialog, $localStorage, $routeParams, $location, auth, universidade, errorHandler) {
    'ngInject'
    this.$mdDialog = $mdDialog
    this.$localStorage = $localStorage
    this.$routeParams = $routeParams
    this.$location = $location
    this.authService = auth
    this.errorHandlerService = errorHandler
    this.universidadeService = universidade

    this.universidadeIndex = this.getCurrentIndex(this.$routeParams.id)
    this.universidadeForm = this.getCurrentUniversidade(this.universidadeIndex)
    this.validateExists(this.universidadeIndex)
  }

  validateExists(index) {
    if (index < 0) this.$location.path('/universidades/consultar')
  }

  getCurrentUniversidade(index) {
    return this.$localStorage.universidades[index]
  }

  getCurrentIndex(id) {
    return this.$localStorage.universidades.findIndex(
      universidade => universidade.codigo === id
    )
  }

  deleteFromStorage(id) {
    let index = this.getCurrentIndex(id)
    delete this.$localStorage.universidades[index]
  }

  submit() {
    let authObject = this.authService.get()
    let data = angular.copy(this.universidadeForm)
    let options = {id: data.codigo}

    this.universidadeService
      .api.root
      .update(options, data).$promise.then(
        (success) => {
          if (success.$resolved === true) {
            console.log(this.$localStorage.universidades)
            console.log(data)
            this.$localStorage.universidades[this.universidadeIndex] = data
            console.log(this.$localStorage.universidades)
            this.$location.path(`/universidades/consultar`)
          }
        },
        (error) => { console.log(error) }
      )
  }

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
        desta universidade?`)
      .ariaLabel('Excluir universidade')
      .ok('Sim.')
      .cancel('Não, por favor!')
  }

  getDeleteOkCallback() {
    return () => {
      let data = {id: this.$routeParams.id}
      console.log(this.universidadeService
        .api.root
        .destroy(data).$promise.then(
          (success) => {
            if (success.requestStatus === 'true') {
              this.deleteFromStorage(data.id)
              this.$mdDialog.show(
                this.$mdDialog.alert()
                  .title('Concluído.')
                  .textContent(`Os dados da universidade foram excluídos com sucesso.`)
                  .ok('Obrigado')

              ).then(() => {
                this.$location.path('/universidades/consultar')
              })
            }
            else
              this.errorHandlerService.request()()
          },
          this.errorHandlerService.request()
        )
      )
    }
  }

  getDeleteCancelCallback() {
    return () => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .title('Cancelado.')
          .textContent(`Fique tranquilo, os dados da universidade continuam
            intactos.`)
          .ok('Obrigado')
      )
    }
  }
}
