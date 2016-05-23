export default class UsuarioApiService {
  constructor($resource, apiUrl) {
    'ngInject'
    this.$resource = $resource
    this.apiUrl    = apiUrl

    this.apiPath   = 'usuario'
    this.api       = {
      root    : this.getRootResource(),
      usuario : this.getLoginResource(),
    }
  }

  getRootResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/:id`, { id: '@id' }, {
        'create'  : { method: 'POST' },
        'show'    : { method: 'GET', isArray: false },
        'update'  : { method: 'PUT' },
        'destroy' : { method: 'DELETE' }
      }
    )
  }

  getLoginResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/login`, {}, {
        'validate': { method: 'POST' }
      }
    )
  }
}
