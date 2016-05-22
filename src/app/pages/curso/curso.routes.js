export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Create
    ////
    .when(
      '/curso/create',
      { template: '<curso-create></curso-create>' }
    )
    .when(
      '/curso/create/:idUniversidade',
      { template: '<curso-create></curso-create>' }
    )
    .when(
      '/curso/create/:idUniversidade/:idUnidade',
      { template: '<curso-create></curso-create>' }
    )

    ////
    // Read
    ////
    .when(
      '/curso',
      { template: '<curso-read></curso-read>' }
    )

    ////
    // Update
    ////
    .when(
      '/curso/update/:idUniversidade/:idUnidade/:id',
      { template: '<curso-update></curso-update>' }
    )

    .otherwise({ redirectTo: '/' });
}
