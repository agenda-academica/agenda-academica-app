export default class UniversidadeCreateFormController {
  constructor($scope, $location) {
    'ngInject'
    this.$scope = $scope
    this.$location = $location
  }

  openPeriodoLetivo(){
    alert('teste japa viadaon gayzAO');
    this.$location.path('/periodo-letivo')

  }
}
