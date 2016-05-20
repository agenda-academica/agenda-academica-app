export default class UnidadeReadFilterController {
  constructor($scope) {
    'ngInject'
    this.$scope = $scope

    this.filterBy = [
      { key: 'nome', label: 'Nome' },
      { key: 'endereco', label: 'Endereço' },
    ]

    this.selectedUniversidade = ''
    this.$scope.$watch(() => this.selectedUniversidade, this.filterUnidades())

    this.selectedField        = 'nome'
    this.$scope.$watch(() => this.selectedField, this.filterUnidades())

    this.query                = ''
    this.$scope.$watch(() => this.query, this.filterUnidades());
  }

  filterUnidades() {
    return (currentWatchedValue) => {
      this.parent.unidades = this.parent.permUnidades
        .filter(
          (unidade) =>
            this.condUniversidade(unidade, this.selectedUniversidade)
              && this.condQueryAndField(unidade, this.query, this.selectedField)
        )
    }
  }

  condUniversidade(unidade, universidade) {
    if (!universidade) return true
    return unidade.universidade.codigo === universidade.codigo
  }

  condQueryAndField(unidade, query, field) {
    return new RegExp(query, 'gi').test(unidade[field])
  }

  clear() {
    this.selectedUniversidade = ''
    this.selectedField        = 'nome'
    this.query                = ''
    this.parent.unidades      = this.parent.permUnidades
  }
}
