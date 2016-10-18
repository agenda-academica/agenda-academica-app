export default class RepresentanteApiService {
  constructor($resource, apiUrl) {
    'ngInject'

    this.$resource = $resource
    this.apiUrl = apiUrl
    this.apiPath = 'representante'
    this.api = {
      root: this.getRootResource(),
      usuario: this.getUsuarioResource()
    }
  }

  getRootResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/:id`, { id: '@id' }, {
        'create'  : { method: 'POST' },
        'show'    : { method: 'GET', isArray: true },
        'update'  : { method: 'PUT' },
        'destroy' : { method: 'DELETE' }
      }
    )
  }

  getUsuarioResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/usuario/:id`, { id: '@id' }, {
        'show'    : {
          method: 'GET',
          isArray: false,
          transformResponse: (data) => {return {list: angular.fromJson(data)}}
        }
      }
    )
  }
}
