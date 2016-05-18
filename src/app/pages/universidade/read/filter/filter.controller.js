export default class UniversidadeReadFilterController {
  constructor($scope) {
    'ngInject'
    this.$scope = $scope

    this.filterKeyOptions = [
      {key: 'abreviacao', label: 'Abreviação'},
      {key: 'nome', label: 'Nome'}
    ]
    this.filterKeySelected = 'none'
    this.filterQuery = ''
    this.$scope.$watch(() => this.filterKeySelected, this.filterUniversidades())
    this.$scope.$watch(() => this.filterQuery, this.filterUniversidades());
  }

  filterUniversidades () {
    return (key) => {
      this.parent.universidades = this.parent.permUniversidades
        .filter((universidade) =>
          new RegExp(this.filterQuery, 'gi')
            .test(universidade[this.filterKeySelected])
        )
    }
  }

  clearFilters() {
    this.filterKeySelected = 'none'
    this.filterQuery = ''
  }
}
