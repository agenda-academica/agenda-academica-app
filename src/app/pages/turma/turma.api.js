/*ARQUIVO JS RESPONSAVEL POR : BATER NA API (MONTA O CAMINHO DA URL PARA CHEGAR
 ATE A API)
*/

export default class TurmaApiService {
  /*
PARAMETROS:
-  $resource = Pacote do angular.js que faz a requisição http
- apiUrl = constante definida no app.js, que vai ser responsavel pela URL
  */
  constructor($resource, apiUrl) {
    //anotação que vai informar a webPack que os parametros acima deven ser
    //injetados no momento da compilação para produção
    'ngInject'


//aqui define meus atributos utilizado nessa classe
    this.$resource = $resource
    this.apiUrl = apiUrl
    this.apiPath = 'turma'
    this.api = {
      root: this.getRootResource(),
      usuario: this.getUsuarioResource()
    }
  }

  getRootResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/:id`, { id: '@id' }, {
        'create'  : { method: 'POST' },
        'list'    : { method: 'GET', isArray: true },
        'show'    : { method: 'GET', isArray: false },
        'update'  : { method: 'PUT' },
        'destroy' : { method: 'DELETE' }
      }
    )
  }

  getUsuarioResource() {
    return this.$resource(
      `${this.apiUrl}/${this.apiPath}/usuario/:id`, { id: '@id' }, {
        'show': {
          method: 'GET',
          isArray: false,
          transformResponse: (data) => { return {list: angular.fromJson(data)} }
        }
      }
    )
  }
}
