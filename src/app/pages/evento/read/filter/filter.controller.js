export default class EventoReadFilterController {
  constructor($scope) {
    'ngInject'
    this.$scope = $scope

    this.filterBy = [
      { key: 'titulo'     , label: 'Título', placeholder: 'Título' },
      { key: 'descricao'  , label: 'Descrição', placeholder: 'Descrição' },
      { key: 'dataInicio' , label: 'Data Início', placeholder: 'Data Início (yyyy-mm-dd)' },
      { key: 'dataFim'    , label: 'Data Fim', placeholder: 'Data Fim (yyyy-mm-dd)' },
      { key: 'horaInício' , label: 'Hora Início', placeholder: 'Hora Início (HH:mm:ss)' },
      { key: 'horaFim'    , label: 'Hora Fim', placeholder: 'Hora Fim (HH:mm:ss)' },
    ]

    this.selectedUniversidade = undefined
    this.$scope.$watch(() => this.selectedUniversidade, this.filter())

    this.selectedUnidade = undefined
    this.$scope.$watch(() => this.selectedUnidade, this.filter())

    this.selectedCurso = undefined
    this.$scope.$watch(() => this.selectedCurso, this.filter())

    this.selectedTurma = undefined
    this.$scope.$watch(() => this.selectedTurma, this.filter())

    this.selectedDisciplina = undefined
    this.$scope.$watch(() => this.selectedDisciplina, this.filter())

    this.selectedField = 'titulo'
    this.$scope.$watch(() => this.selectedField, this.filter())

    this.query = undefined
    this.$scope.$watch(() => this.query, this.filter());
  }

  //
  // Filters
  //
  filter() {
    return currentWatchedValue => {
      this.parent.unidades = this.parent.permUnidades.filter(this.getUnidadesFilter())
      this.parent.cursos = this.parent.permCursos.filter(this.getCursosFilter())
      this.parent.turmas = this.parent.permTurmas.filter(this.getTurmasFilter())
      this.parent.disciplinas = this.parent.permDisciplinas.filter(this.getDisciplinasFilter())
      this.parent.eventos = this.parent.permEventos.filter(this.getEventosFilter())
    }
  }
  getUnidadesFilter() {
    return entity => this.conditionUniversidade(entity, this.selectedUniversidade)
  }
  getCursosFilter() {
    return entity =>
      this.conditionUniversidade(entity, this.selectedUniversidade)
        && this.conditionUnidade(entity, this.selectedUnidade)
  }
  getTurmasFilter() {
    return entity =>
      this.conditionUniversidade(entity, this.selectedUniversidade)
        && this.conditionUnidade(entity, this.selectedUnidade)
        && this.conditionCurso(entity, this.selectedCurso)
  }
  getDisciplinasFilter() {
    return entity =>
      this.conditionUniversidade(entity, this.selectedUniversidade)
        && this.conditionUnidade(entity, this.selectedUnidade)
        && this.conditionCurso(entity, this.selectedCurso)
        && this.conditionTurma(entity, this.selectedTurma)
  }
  getEventosFilter() {
    return entity =>
      this.conditionUniversidade(entity, this.selectedUniversidade)
        && this.conditionUnidade(entity, this.selectedUnidade)
        && this.conditionCurso(entity, this.selectedCurso)
        && this.conditionTurma(entity, this.selectedTurma)
        && this.conditionDisciplina(entity, this.selectedDisciplina)
        && this.conditionQueryAndField(entity, this.query, this.selectedField)
  }

  //
  // Conditions
  //
  conditionUniversidade(entity, universidade) {
    return !universidade ? true : entity.universidade.id === universidade.id
  }
  conditionUnidade(entity, unidade) {
    return !unidade ? true : entity.unidade.id === unidade.id
  }
  conditionCurso(entity, curso) {
    return !curso ? true : entity.curso.id === curso.id
  }
  conditionTurma(entity, turma) {
    return !turma ? true : entity.turma.id === turma.id
  }
  conditionDisciplina(entity, disciplina) {
    return !disciplina ? true : entity.disciplina.id === disciplina.id
  }
  conditionQueryAndField(entity, query, field) {
    return new RegExp(query, 'gi').test(entity[field])
  }
  getFilterLabel(key) {
    const filter = this.filterBy.filter(col => col.key === key)
    return !filter.length ? undefined : filter[0].placeholder
  }

  //
  // Resets
  //
  clear() {
    this.selectedUniversidade = undefined
    this.selectedUnidade      = undefined
    this.selectedField        = 'titulo'
    this.query                = undefined
    this.parent.cursos        = this.parent.permCursos
  }
}
