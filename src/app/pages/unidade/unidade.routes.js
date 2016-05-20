export default function($routeProvider) {
  'ngInject'
  $routeProvider

    ////
    // Read
    ////
    .when(
      '/unidade',
      { template: '<unidade-read></unidade-read>' }
    )

    ////
    // Create
    ////
    .when(
      '/unidade/create',
      { template: '<unidade-create></unidade-create>' }
    )
    .when(
      '/unidade/create/:idUniversidade',
      { template: '<unidade-create></unidade-create>' }
    )

    ////
    // Update
    ////
    .when(
      '/unidade/update/:idUniversidade/:id',
      { template: '<unidade-update></unidade-update>' }
    )
}
