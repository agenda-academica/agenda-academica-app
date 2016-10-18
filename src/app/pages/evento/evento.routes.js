export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Create
    ////
    .when(
      '/evento/create',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/create/:idUniversidade',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/create/:idUniversidade/:idUnidade',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/create/:idUniversidade/:idUnidade/:idCurso',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/create/:idUniversidade/:idUnidade/:idCurso/:idTurma',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/create/:idUniversidade/:idUnidade/:idCurso/:idTurma/:idDisciplina',
      { template: '<evento-create></evento-create>' }
    )
    .when(
      '/evento/createFromDiaSemana/:diaSemana',
      { template: '<evento-create></evento-create>' }
    )

    ////
    // Read
    ////
    .when(
      '/evento',
      { template: '<evento-read></evento-read>' }
    )
    // .when(
    //   '/evento/:idUniversidade/:idUnidade/:idCurso/:idTurma/:idDisciplina',
    //   { template: '<evento-read></evento-read>' }
    // )

    // ////
    // // Update
    // ////
    // .when(
    //   '/evento/update/:idUniversidade/:idUnidade/:idCurso/:idTurma/:id',
    //   { template: '<evento-update></evento-update>' }
    // )

    .otherwise({ redirectTo: '/' });
}
