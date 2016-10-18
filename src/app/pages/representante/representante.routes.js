export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Read
    ////
    .when(
      '/representante/:idUniversidade/:idUnidade/:idCurso/:idTurma',
      { template: '<representante-read></representante-read>' }
    )

    ////
    // Create
    ////
    .when(
      '/representante/create/:idUniversidade/:idUnidade/:idCurso/:idTurma',
      { template: '<representante-create></representante-create>' }
    )

    // ////
    // // Update
    // ////
    .when(
      '/representante/update/:idUniversidade/:idUnidade/:idCurso/:idTurma/:id',
      { template: '<representante-update></representante-update>' }
    )

    .otherwise({ redirectTo: '/' });
}
