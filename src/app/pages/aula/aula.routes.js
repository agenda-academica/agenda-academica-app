export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Info
    ////
    .when(
      '/aula/info/:idUniversidade/:idUnidade/:idCurso/:idTurma/:id',
      { template: '<aula-info></aula-info>' }
    )

    .otherwise({ redirectTo: '/' });
}
