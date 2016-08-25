export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Create
    ////
    .when(
      '/disciplina/create',
      { template: '<disciplina-create></disciplina-create>' }
    )
    .when(
      '/disciplina/create/:idUniversidade',
      { template: '<disciplina-create></disciplina-create>' }
    )
    .when(
      '/disciplina/create/:idUniversidade/:idUnidade',
      { template: '<disciplina-create></disciplina-create>' }
    )
    .when(
      '/disciplina/create/:idUniversidade/:idUnidade/:idCurso',
      { template: '<disciplina-create></disciplina-create>' }
    )
    .when(
      '/disciplina/create/:idUniversidade/:idUnidade/:idCurso/:idTurma',
      { template: '<disciplina-create></disciplina-create>' }
    )
    .when(
      '/disciplina/createFromDiaSemana/:diaSemana',
      { template: '<disciplina-create></disciplina-create>' }
    )

    ////
    // Read
    ////
    .when(
      '/disciplina',
      { template: '<disciplina-read></disciplina-read>' }
    )

    ////
    // Update
    ////
    // .when(
    //   '/disciplina/update',
    //   { template: '<disciplina-update></disciplina-update>' }
    // )
    // .when(
    //   '/disciplina/update/:idUniversidade/:idUnidade/:idCurso/:idTurma/:id',
    //   { template: '<disciplina-update></disciplina-update>' }
    // )

    .otherwise({ redirectTo: '/' });
}
