/*
Classe responsavel por definir as rotas das paginas
*/

export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Create
    ////
    .when(
      '/turma/create',
      { template: '<turma-create></turma-create>' }
    )
    .when(
      '/turma/create/:idUniversidade',
      { template: '<turma-create></turma-create>' }
    )
    .when(
      '/turma/create/:idUniversidade/:idUnidade',
      { template: '<turma-create></turma-create>' }
    )
    .when(
      '/turma/create/:idUniversidade/:idUnidade/:idCurso',
      { template: '<turma-create></turma-create>' }
    )

    ////
    // Read
    ////
    .when(
      '/turma',
      { template: '<turma-read></turma-read>' }
    )

    ////
    // Update
    ////
    .when(
      '/turma/update/:idUniversidade/:idUnidade/:id',
      { template: '<turma-update></turma-update>' }
    )

    .otherwise({ redirectTo: '/' });
}
