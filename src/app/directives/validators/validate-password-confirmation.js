export default class ValidatePasswordConfirmation {
  constructor(ngModel) {
    'ngInject'
    this.restrict = 'A'
    this.require = 'ngModel'
    this.scope = {
      currentPassword: '@'
    }
  }

  link(scope, element, attributes, ctrl) {
    var validate = (ngModelValue) => {
      ctrl.$setValidity(
        'validatePasswordConfirmation',
        ngModelValue === attributes.validatePasswordConfirmation
      );

      return ngModelValue;
    }

    ctrl.$parsers.push(validate);
  }
}
