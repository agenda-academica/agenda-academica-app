export default class UpdateUniversidadeController {
  constructor($scope, $mdDialog, $localStorage, $routeParams, $location, auth, universidade, universidadeStorage, errorHandler) {
    'ngInject'
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$localStorage = $localStorage
    this.$routeParams = $routeParams
    this.$location = $location
    this.authService = auth
    this.universidadeService = universidade
    this.universidadeStorage = universidadeStorage
    this.errorHandler = errorHandler

    this.initStorageRequests()
  }

  initStorageRequests() {
    if (!this.universidadeStorage.has())
      this.universidadeStorage.requestByUsuario().then(
        this.requestUniversidadesByUsuarioSuccess(this.init()),
        this.errorHandler.request()
      )
    else
      this.init()()
  }

  requestUniversidadesByUsuarioSuccess(initCallback) {
    return () => { initCallback() }
  }

  init() {
    return () => {
      this.universidadeIndex = this.getCurrentIndex(this.$routeParams.id)
      this.universidadeForm = this.getCurrentUniversidade(this.universidadeIndex)

      if (this.universidadeIndex < 0)
        this.$location.path('/universidade/read')
    }
  }

  getCurrentIndex(id) {
    return this.universidadeStorage.take().findIndex(
      universidade => universidade.codigo == id
    )
  }

  getCurrentUniversidade(index) {
    return this.universidadeStorage.take()[index]
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

  getPreenchimentoAlert() {
    return this.$mdDialog.alert()
      .title('Tudo preenchido?')
      .textContent(`Verifique se o preenchimento dos campos obrigatórios
        foram feitos corretamente.`)
      .ok('Ok, vou verificar')
  }

  sendUpdateRequest() {
    let authObject = this.authService.get()
    let data = angular.copy(this.universidadeForm)
    let options = {id: data.codigo}

    this.universidadeStorage.update(options, data).then(
      this.getUpdateSuccessCallback(),
      this.errorHandler.request()
    )
  }

  getUpdateSuccessCallback() {
    return () => {
      this.$location.path('/universidade/read')
    }
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
      let options = {id: this.$routeParams.id}
      this.universidadeStorage.delete(options).then(
        this.getDeleteSuccessCallback(),
        this.errorHandler.request()
      )
    }
  }

  getDeleteSuccessCallback() {
    return () => {
      this.$mdDialog
        .show(this.getDeleteOkCallbackAlert())
        .then(() => { this.$location.path('/universidade/read') })
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
