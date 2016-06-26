export default class DiasSemanaService {
  constructor() {
    this.DOMINGO = 0
    this.SEGUNDA = 1
    this.TERCA   = 2
    this.QUARTA  = 3
    this.QUINTA  = 4
    this.SEXTA   = 5
    this.SABADO  = 6

    this.days = [
      { label: "Domingo"       , key: 'domingo' },
      { label: "Segunda-feira" , key: 'segunda' },
      { label: "Terça-feira"   , key: 'terca' },
      { label: "Quarta-feira"  , key: 'quarta' },
      { label: "Quinta-feira"  , key: 'quinta' },
      { label: "Sexta-feira"   , key: 'sexta' },
      { label: "Sábado"        , key: 'sabado' }
    ]
  }

  getDays() {
    return this.days
  }

  getByIndex(index) {
    return this.days[index]
  }

  getIndexByLabel(label) {
    return this.days.findIndex(day => day.label === label)
  }

  getIndexByKey(key) {
    return this.days.findIndex(day => day.key === key)
  }
}
