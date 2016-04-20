export default class LoginApiService {
  constructor($resource, apiUrl) {
    'ngInject'
    this.api = $resource(
      `${apiUrl}/usuario/login`, {},
      { 'validate': { method: 'POST' } }
    )
  }
}
