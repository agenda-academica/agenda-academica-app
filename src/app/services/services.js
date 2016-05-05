import angular from 'angular'

import httpLoaderInterceptor  from './interceptors/httpLoaderInterceptor'
import api                    from './api/api'
import auth                   from './auth'
import crypto                 from './crypto'
import angularRouteResolve    from './angular-route-resolve'
import errorHandler           from './error-handler'

export default angular
  .module('app.services', [])
  .service('httpLoaderInterceptor', () => new httpLoaderInterceptor)
  .service(api)
  .service({
    auth,
    crypto,
    angularRouteResolve,
    errorHandler
  })
