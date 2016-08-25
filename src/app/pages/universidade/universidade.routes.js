export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Read
    ////
    .when(
      '/universidade',
      { template: '<universidade-read></universidade-read>' }
    )

    ////
    // Create
    ////
    .when(
      '/universidade/create',
      { template: '<universidade-create></universidade-create>' }
    )

    ////
    // Update
    ////
    .when(
      '/universidade/update/:id',
      { template: '<universidade-update></universidade-update>' }
    )

    //Periodo letivo
     .when(
      '/periodoLetivo',
      { template: '<periodo-letivo-read></periodo-letivo-read>' }
    )

    .otherwise({ redirectTo: '/' });
}
