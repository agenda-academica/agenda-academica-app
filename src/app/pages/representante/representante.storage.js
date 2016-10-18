export default class RepresentanteStorage {
  constructor($localStorage, $q, representante, errorHandler, usuarioAuth) {
    'ngInject'
    this.$localStorage       = $localStorage
    this.$q                  = $q
    this.representanteService = representante
    this.errorHandler        = errorHandler
    this.usuarioAuth         = usuarioAuth

    this.name = 'representante'
  }

  has() {
    let storage = this.$localStorage[this.name]
    return storage && angular.isArray(storage)
  }

  take() {
    if (!this.has()) this.put([])
    return this.$localStorage[this.name]
  }

  put(representantes) {
    this.$localStorage[this.name] = representantes
  }

  push(representante) {
    this.take().push(representante)
  }

  getIndexOf(idRepresentante) {
    return this.take().findIndex(
      representante => representante.id == idRepresentante
    )
  }

  getById(idRepresentante) {
    return this.take()[this.getIndexOf(idRepresentante)]
  }

  getByIndex(index) {
    return this.take()[index]
  }

  getLast() {
    return this.take()[this.take().length - 1]
  }

  ////
  // Helpers
  ////
  findIndexById(idRepresentante) {
    return representante => representante.id == idUniversidade
  }

  ////
  // CREATE
  ////
  create(data) {

//TODO: para fazer ainda essa merda         ---- tem q arrumar no periodo letivo tb
//data["idUniversidade"] = 1


    let deferred = this.$q.defer()

    this.representanteService
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
      else deferred.reject('Erro: Cadastro de representante.')

      return deferred.promise
    }
  }

  ////
  // READ
  ////
  requestByUsuario() {
    let deferred = this.$q.defer()

    this.representanteService
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
      else deferred.reject('Error:   Read Request.')

      return deferred.promise
    }
  }

  ////
  // UPDATE
  ////
  update(options, data) {
    let deferred = this.$q.defer()

    this.representanteService
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
      else deferred.reject('Error: Update Request.')

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

    this.representanteService
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
      else deferred.reject('Error: representante Delete Request.')

      return deferred.promise
    }
  }

  deleteIndex(options) {
    let index = this.getIndexOf(options.id)
    delete this.take()[index]
  }
}
