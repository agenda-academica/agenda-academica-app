export default class UniversidadeCreateFormController {
  constructor($scope, $location) {
    'ngInject'
    this.$scope = $scope
    this.$location = $location
  }

  openPeriodoLetivo(){
     this.$location.path('/periodo-letivo')

  }
}
