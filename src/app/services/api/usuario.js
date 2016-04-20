export default class UsuarioApiService {
  constructor($resource, apiUrl) {
    'ngInject'
    this.api = $resource(
      `${apiUrl}/usuario/:id`, { id: '@id' }, {
        'create'  : { method: 'POST' },
        'show'    : { method: 'GET', isArray: false },
        'update'  : { method: 'PUT' },
        'destroy' : { method: 'DELETE' }
      }
    )
  }
}
