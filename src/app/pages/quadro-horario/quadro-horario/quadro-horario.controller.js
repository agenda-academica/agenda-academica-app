import segundaFeira  from './segunda-feira.json'
import tercaFeira    from './terca-feira.json'
import quartaFeira   from './quarta-feira.json'
import quintaFeira   from './quinta-feira.json'
import sextaFeira    from './sexta-feira.json'

export default class QuadroHorarioController {
  constructor($location, moment) {
    'ngInject'
    this.$location              = $location
    this.moment                 = moment

    this.tabsSelectedIndex      = this.moment().day()
    this.quadroSegunda          = segundaFeira
    // this.quadroSegunda          = []
    this.quadroTerca            = tercaFeira
    this.quadroQuarta           = quartaFeira
    this.quadroQuinta           = quintaFeira
    this.quadroSexta            = sextaFeira
  }

  onSwipeLeft() {
    if (this.tabsSelectedIndex === 6) this.tabsSelectedIndex = 0
    else this.tabsSelectedIndex++
  }

  onSwipeRight() {
    if (this.tabsSelectedIndex === 0) this.tabsSelectedIndex = 6
    else this.tabsSelectedIndex--
  }
}
