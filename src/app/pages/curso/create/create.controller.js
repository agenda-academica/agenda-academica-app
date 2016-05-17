export default class CreateUniversidadeController {
  constructor($scope, $localStorage) {
    'ngInject'
    this.$scope = $scope
    this.$localStorage = $localStorage
    this.permUniversidades = this.$localStorage.universidades
    this.permUnidades = this.$localStorage.unidades

    this.universidades = angular.copy(this.permUniversidades)
    this.unidades = angular.copy(this.permUnidades)

    this.universidadeCurrentIndex = null
    this.unidadeCurrentIndex = null

    this.hasUniversidadeId = false
    this.hasUnidadeId = false

    this.cursoForm = {}

    this.$scope.$watch(
      () => this.cursoForm.currentUniversidade,
      this.watchUniversidadeSelect()
    )

    this.$scope.$watch(
      () => this.cursoForm.currentUnidade,
      this.filterCurso()
    )
  }

  filterCurso() {
    return (res) => {
      console.log(res)
    }
  }

  watchUniversidadeSelect () {
    return (universidade) => {
      if (universidade) {
        this.cursoForm.unidades = this.permUnidades.filter((unidade) =>
          unidade.idUniversidade === universidade.codigo
        )
        console.log(this.cursoForm.unidades)
      }
    }
  }

  submit() {
    console.log(this.$scope.createCurso)
  }
}
