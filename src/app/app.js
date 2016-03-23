import 'angular-material/angular-material.min.css'
import 'normalize.css'

import angular                from 'angular'
import angularMaterial        from 'angular-material'
import angularAnimate         from 'angular-animate'
import angularResource        from 'angular-resource'
import angularMaterialIcons   from 'angular-material-icons'
import angularMessages        from 'angular-messages'
import angularRoute           from 'angular-route'
import angularFileUpload      from 'ng-file-upload'

import services     from './services/services'
import components   from './components/components'
import pages        from './pages/pages'

angular.module('app', [
  angularMaterial,
  angularAnimate,
  angularResource,
  angularMaterialIcons,
  angularMessages,
  angularRoute,
  angularFileUpload,

  services.name,
  components.name,
  pages.name
])
.config(function ($routeProvider, $locationProvider) {
  "ngInject";
  $routeProvider
    .when('/', { template: '<app></app>' })
    .when('/universidades', { template: '<universidades></universidades>' })
    .when('/unidades', { template: '<unidades></unidades>' })
    .when('/cursos', { template: '<cursos></cursos>' })
    .otherwise({ redirectTo: '/' });
  $locationProvider.html5Mode(true)
})

angular.bootstrap(document, ['app'], {})
