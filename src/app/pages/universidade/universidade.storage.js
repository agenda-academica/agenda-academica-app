export default class UniversidadeStorage {
  constructor($localStorage, $q, universidade, errorHandler, auth) {
    'ngInject'
    this.$localStorage       = $localStorage
    this.$q                  = $q
    this.universidadeService = universidade
    this.errorHandler        = errorHandler
    this.authService         = auth
  }

  has() {
    let storage = this.$localStorage.universidades
    return storage && angular.isArray(storage)
  }

  take() {
    return this.$localStorage.universidades
  }

  getIndexOf(idUniversidade) {
    return this.take().findIndex(
      universidade => universidade.codigo == idUniversidade
    )
  }

  getById(idUniversidade) {
    return this.take()[this.getIndexOf(idUniversidade)]
  }

  ////
  // READ
  ////
  requestByUsuario() {
    let deferred = this.$q.defer()

    this.universidadeService
      .api.usuario.show({id: this.authService.get().id})
      .$promise.then(
        this.getSuccessCallback(deferred),
        this.errorHandler.request()
      )
    return deferred.promise
  }

  getSuccessCallback(deferred) {
    return (success) => {
      if (success.list.length > 0) {
        this.$localStorage.universidades = success.list
        deferred.resolve()
      }
      else if (success.list.requestStatus === true) {
        this.$localStorage.universidades = []
        deferred.resolve()
      }
      else deferred.reject('error')

      return deferred.promise
    }
  }

  ////
  // UPDATE
  ////
  update(options, data) {
    let deferred = this.$q.defer()

    this.universidadeService
      .api.root
      .update(options, data).$promise.then(
        this.getUpdateSuccessCallback(deferred, data),
        this.errorHandler.request()
      )
    return deferred.promise
  }

  getUpdateSuccessCallback(deferred, data) {
    return (success) => {
      if (success.requestStatus === true) {
        this.updateIndex(data)
        deferred.resolve()
      }
      else deferred.reject('error')

      return deferred.promise
    }
  }

  updateIndex(data) {
    let index = this.getIndexOf(data.codigo)
    this.take()[index] = data
  }

  ////
  // DELETE
  ////
  delete(options) {
    let deferred = this.$q.defer()

    this.universidadeService
      .api.root
      .destroy(options).$promise.then(
        this.getDeleteSuccessCallback(deferred, options),
        this.errorHandler.request()
      )
    return deferred.promise
  }

  getDeleteSuccessCallback(deferred, options) {
    return (success) => {
      if (success.requestStatus === true) {
        this.deleteIndex(options)
        deferred.resolve()
      }
      else deferred.reject('error')

      return deferred.promise
    }
  }

  deleteIndex(options) {
    let index = this.getIndexOf(options.id)
    delete this.take()[index]
  }
}
