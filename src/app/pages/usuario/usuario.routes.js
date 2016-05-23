export default function($routeProvider) {
  'ngInject'

  $routeProvider
    .when(
      '/usuario/login',
      { template: '<usuario-login></usuario-login>' }
    )
    .when(
      '/usuario/create',
      { template: '<usuario-create></usuario-create>' }
    )
    .when(
      '/usuario/update',
      { template: '<usuario-update></usuario-update>' }
    )
}
