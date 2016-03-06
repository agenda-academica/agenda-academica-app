export default class Students
{
  constructor($resource) {
    "ngInject";
    // this.api = $resource("http://localhost:3011/api/Accounts/:id", { id: "@id" },
    this.api = $resource("http://localhost:8080/cellar/rest/wines/:id", { id: "@id" },
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'new':     { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );
  }
}
