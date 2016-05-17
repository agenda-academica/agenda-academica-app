export default class UniversidadeStorage {
  constructor($localStorage, $q, universidade, errorHandler, auth) {
    'ngInject'
    this.$localStorage = $localStorage
    this.$q = $q
    this.universidadeService = universidade
    this.errorHandlerService = errorHandler
    this.authService = auth
  }

  has() {
    let storage = this.$localStorage.universidades
    return storage && angular.isArray(storage)
  }

  get() {
    return this.$localStorage.universidades
  }

  requestByUsuario() {
    let deferred = this.$q.defer()

    if (!this.has())
      this.universidadeService.api.usuario
        .show({id: this.authService.get().id}).$promise.then(
          this.getSuccessCallback(deferred),
          this.errorHandlerService.requestDeferred(deferred)
        )
    else deferred.resolve()
    return deferred.promise
  }

  getIndexOf(idUniversidade) {
    return this.get().findIndex(
      universidade => universidade.codigo == idUniversidade
    )
  }

  getById(idUniversidade) {
    return this.get()[this.getIndexOf(idUniversidade)]
  }

  getSuccessCallback(deferred) {
    return (success) => {
      this.$localStorage.universidades = success.list
      deferred.resolve()
      return deferred
    }
  }
}
