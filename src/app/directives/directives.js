import angular from 'angular'

import validatePasswordConfirmation from './validators/validate-password-confirmation'

export default angular
  .module('app.directives', [])
  .directive('validatePasswordConfirmation', () => new validatePasswordConfirmation)
