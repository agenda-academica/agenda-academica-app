export default class UpdateUniversidadeController {
  constructor($scope, $mdDialog, $localStorage, $routeParams, $location, auth, universidade, errorHandler) {
    'ngInject'
    this.$scope = $scope
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
    if (index < 0) this.$location.path('/universidade/read')
  }

  getCurrentUniversidade(index) {
    return this.$localStorage.universidades[index]
  }

  getCurrentIndex(id) {
    return this.$localStorage.universidades.findIndex(
      universidade => universidade.codigo == id
    )
  }

  deleteFromStorage(id) {
    let index = this.getCurrentIndex(id)
    delete this.$localStorage.universidades[index]
  }

  submit() {
    this.sendUpdateRequest()
  }

  submitOutsideForm() {
    if (this.$scope.updateUniversidade.$invalid) {
      this.$mdDialog.show(this.getPreenchimentoAlert())
      return
    }
    this.sendUpdateRequest()
  }

  sendUpdateRequest() {
    let authObject = this.authService.get()
    let data = angular.copy(this.universidadeForm)
    let options = {id: data.codigo}

    this.universidadeService
      .api.root
      .update(options, data).$promise.then(
        this.getUpdateSuccessCallback(data),
        this.errorHandlerService.request()
      )
  }

  getUpdateSuccessCallback(data) {
    return (success) => {
      if (success.$resolved === true) {
        this.$localStorage.universidades[this.universidadeIndex] = data
        this.$location.path('/universidade/read')
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
      this.universidadeService
        .api.root.destroy(data)
        .$promise.then(
          this.getDestroySuccessCallback(data),
          this.errorHandlerService.request()
        )
    }
  }

  getDestroySuccessCallback(data) {
    return (success) => {
      if (success.requestStatus === 'true') {
        this.deleteFromStorage(data.id)
        this.$mdDialog
          .show(this.getDeleteOkCallbackAlert())
          .then(() => { this.$location.path('/universidade/read') })
      }
      else
        this.errorHandlerService.request()()
    }
  }

  getDeleteOkCallbackAlert() {
    return this.$mdDialog.alert()
      .title('Concluído.')
      .textContent(`Os dados da universidade foram excluídos com sucesso.`)
      .ok('Obrigado')
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
