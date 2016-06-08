export default class UniversidadeStorage {
  constructor($localStorage, $q, universidade, errorHandler, usuarioAuth) {
    'ngInject'
    this.$localStorage       = $localStorage
    this.$q                  = $q
    this.universidadeService = universidade
    this.errorHandler        = errorHandler
    this.usuarioAuth         = usuarioAuth

    this.name = 'universidades'
  }

  has() {
    let storage = this.$localStorage[this.name]
    return storage && angular.isArray(storage)
  }

  take() {
    if (!this.has()) this.put([])
    return this.$localStorage[this.name]
  }

  put(universidades) {
    this.$localStorage[this.name] = universidades
  }

  push(universidade) {
    this.take().push(universidade)
  }

  getIndexOf(idUniversidade) {
    return this.take().findIndex(
      universidade => universidade.id == idUniversidade
    )
  }

  getById(idUniversidade) {
    return this.take()[this.getIndexOf(idUniversidade)]
  }

  getByIndex(index) {
    return this.take()[index]
  }

  getLast() {
    return this.take()[this.take().length - 1]
  }

  ////
  // CREATE
  ////
  create(data) {
    let deferred = this.$q.defer()

    this.universidadeService
      .api.root
      .create(data).$promise.then(
        this.getCreateSuccessCallback(deferred, data),
        this.errorHandler.request()
      )
    return deferred.promise
  }

  getCreateSuccessCallback(deferred, data) {
    return (success) => {
      if (success.requestStatus) {
        this.push(success)
        deferred.resolve()
      }
      else deferred.reject('Error: Universidade Create Request.')

      return deferred.promise
    }
  }

  ////
  // READ
  ////
  requestByUsuario() {
    let deferred = this.$q.defer()

    this.universidadeService
      .api.usuario.show({id: this.usuarioAuth.take().id})
      .$promise.then(
        this.getSuccessCallback(deferred),
        this.errorHandler.request()
      )
    return deferred.promise
  }

  getSuccessCallback(deferred) {
    return (success) => {
      if (success.list.length > 0) {
        this.$localStorage[this.name] = success.list
        deferred.resolve()
      }
      else if (success.list.requestStatus === true) {
        this.$localStorage[this.name] = []
        deferred.resolve()
      }
      else deferred.reject('Error: Universidade Read Request.')

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
      else deferred.reject('Error: Universidade Update Request.')

      return deferred.promise
    }
  }

  updateIndex(data) {
    let index = this.getIndexOf(data.id)
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
      else deferred.reject('Error: Universidade Delete Request.')

      return deferred.promise
    }
  }

  deleteIndex(options) {
    let index = this.getIndexOf(options.id)
    delete this.take()[index]
  }
}
