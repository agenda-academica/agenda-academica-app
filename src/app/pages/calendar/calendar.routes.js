export default function($routeProvider) {
  'ngInject'
  $routeProvider

    .when(
      '/calendar',
      {
        template: '<calendar></calendar>',
        resolve: { logged: 'angularRouteResolve' }
      }
    )
}
