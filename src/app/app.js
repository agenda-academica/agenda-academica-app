import 'angular-material/angular-material.min.css'
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
import 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'
import 'normalize.css'

// JS dependencies.
import 'bootstrap-webpack'

import angular                  from 'angular'
import angularMaterial          from 'angular-material'
import angularAnimate           from 'angular-animate'
import angularResource          from 'angular-resource'
import angularMaterialIcons     from 'angular-material-icons'
import angularMessages          from 'angular-messages'
import angularRoute             from 'angular-route'
import angularFileUpload        from 'ng-file-upload'
import angularUiBootstrap       from 'angular-ui-bootstrap'
import angularBootstrapCalendar from 'angular-bootstrap-calendar'
import angularCookies           from 'angular-cookies'
import angularStorage           from 'ngstorage'

// JS isolated dependencies.
import 'ng-mask/dist/ngMask.min'

import services    from './services/services'
import components  from './components/components'
import directives  from './directives/directives'
import pages       from './pages/pages'

angular.module('app', [
  angularMaterial,
  angularAnimate,
  angularResource,
  angularMaterialIcons,
  angularMessages,
  angularRoute,
  angularFileUpload,
  angularUiBootstrap,
  angularBootstrapCalendar,
  angularCookies,
  'ngStorage',

  'ngMask',

  services.name,
  components.name,
  directives.name,
  pages.name
])

.config((calendarConfig, moment) => {
  'ngInject'
  moment.locale('pt-br');
  calendarConfig.dateFormatter = 'moment';
  calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
  calendarConfig.allDateFormats.moment.date.weekDay = 'ddd';
  calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
  calendarConfig.i18nStrings.weekNumber = '{week}';
  calendarConfig.displayAllMonthEvents = true;
  calendarConfig.displayEventEndTimes = true;
  calendarConfig.showTimesOnWeekView = true;
})

/**
 * Routes
 */
.config(($routeProvider) => {
  'ngInject'

  $routeProvider
    .when(
      '/',
      { template: '<splash></splash>' }
    )

    .when(
      '/login',
      { template: '<login></login>' }
    )
    .when(
      '/signup',
      { template: '<signup></signup>' }
    )

    // User
    .when(
      '/user/edit',
      { template: '<user-edit></user-edit>' }
    )

    .otherwise({ redirectTo: '/' });
})

.config(($httpProvider) => {
  'ngInject'
  $httpProvider.interceptors.push('httpLoaderInterceptor');
})

.constant('apiUrl',
  /https?\:\/\/localhost/.test(window.location.href)
    ? 'http://localhost:8080/agenda-academica-api/rest'
    : 'https://infinite-wave-42974.herokuapp.com/rest'
)

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app'], {})
});
