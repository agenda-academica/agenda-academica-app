export default class CursoReadFilterController {
  constructor($scope) {
    'ngInject'
    this.$scope = $scope

    this.filterBy = [
      { key: 'abreviacao' , label: 'Abreviação' },
      { key: 'nome'       , label: 'Nome' },
    ]

    this.selectedUniversidade = undefined
    this.$scope.$watch(() => this.selectedUniversidade, this.filter())

    this.selectedUnidade = undefined
    this.$scope.$watch(() => this.selectedUnidade, this.filter())

    this.selectedField = 'nome'
    this.$scope.$watch(() => this.selectedField, this.filter())

    this.query = undefined
    this.$scope.$watch(() => this.query, this.filter());
  }

  filter() {
    return (currentWatchedValue) => {
      this.parent.unidades = this.parent.permUnidades.filter(this.getUnidadesFilter())
      this.parent.cursos = this.parent.permCursos.filter(this.getCursosFilter())
    }
  }

  getUnidadesFilter() {
    return (entity) => this.conditionUniversidade(entity, this.selectedUniversidade)
  }

  getCursosFilter() {
    return (entity) =>
      this.conditionUniversidade(entity, this.selectedUniversidade)
        && this.conditionUnidade(entity, this.selectedUnidade)
        && this.conditionQueryAndField(entity, this.query, this.selectedField)
  }

  conditionUniversidade(entity, universidade) {
    if (!universidade) return true
    return entity.universidade.id === universidade.id
  }

  conditionUnidade(entity, unidade) {
    if (!unidade) return true
    return entity.unidade.id === unidade.id
  }

  conditionQueryAndField(entity, query, field) {
    return new RegExp(query, 'gi').test(entity[field])
  }

  clear() {
    this.selectedUniversidade = undefined
    this.selectedUnidade      = undefined
    this.selectedField        = 'nome'
    this.query                = undefined
    this.parent.cursos        = this.parent.permCursos
  }
}
