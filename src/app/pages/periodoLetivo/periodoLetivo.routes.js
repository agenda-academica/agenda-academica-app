export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Read
    ////
    .when(
      '/periodo-letivo/:idUniversidade',
      { template: '<periodo-letivo-read></periodo-letivo-read>' }
    )

    ////
    // Create
    ////
    .when(
      '/periodo-letivo/create/:idUniversidade',
      { template: '<periodo-letivo-create></periodo-letivo-create>' }
    )

    // ////
    // // Update
    // ////
    .when(
      '/periodo-letivo/update/:idUniversidade/:id',
      { template: '<periodo-letivo-update></periodo-letivo-update>' }
    )

    .otherwise({ redirectTo: '/' });
}
