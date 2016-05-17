export default class UnidadeStorage {
  constructor($localStorage, $q, unidade, errorHandler, auth) {
    'ngInject'
    this.$localStorage = $localStorage
    this.$q = $q
    this.unidadeService = unidade
    this.errorHandlerService = errorHandler
    this.authService = auth
  }

  has() {
    let storage = this.$localStorage.unidades
    return storage
      && angular.isArray(storage)
  }

  get() {
    return this.$localStorage.unidades
  }

  requestByUsuario() {
    let deferred = this.$q.defer()

    this.unidadeService
      .api.usuario.show({id: this.authService.get().id})
      .$promise.then(
        this.getSuccessCallback(deferred),
        this.errorHandlerService.request()
      )
    return deferred.promise
  }

  getSuccessCallback(deferred) {
    return (success) => {
      if (success.list.length > 0) {
        this.$localStorage.unidades = success.list
        deferred.resolve()
      }
      else if (success.list.requestStatus === true) {
        this.$localStorage.unidades = []
        deferred.resolve()
      }
      else deferred.reject('error')

      return deferred.promise
    }
  }
}
