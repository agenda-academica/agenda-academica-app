import angular from 'angular'

import httpLoaderInterceptor  from './interceptors/httpLoaderInterceptor'
import crypto                 from './crypto'
import angularRouteResolve    from './angular-route-resolve'
import errorHandler           from './error-handler'
import diasSemana             from './dias-semana'

export default angular
  .module('app.services', [])
  .service('httpLoaderInterceptor', () => new httpLoaderInterceptor)
  .service({
    crypto,
    angularRouteResolve,
    errorHandler,
    diasSemana
  })
