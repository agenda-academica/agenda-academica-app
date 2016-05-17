import usjtLogoImage from './../universidade/read/usjt.jpg'
import mackLogoImage from './../universidade/read/mackenzie.jpg'
import fiapLogoImage from './../universidade/read/fiap.jpg'

import segundaFeira  from './segunda-feira.json'
import tercaFeira    from './terca-feira.json'
import quartaFeira   from './quarta-feira.json'
import quintaFeira   from './quinta-feira.json'
import sextaFeira    from './sexta-feira.json'
import moment        from 'moment'

export default class QuadroHorarioController {
  constructor($location) {
    'ngInject'
    this.$location              = $location

    this.temporaryUsjtLogoImage = usjtLogoImage
    this.temporaryMackLogoImage = mackLogoImage
    this.temporaryFiapLogoImage = fiapLogoImage

    this.tabsSelectedIndex      = moment().day()
    this.quadroSegunda          = segundaFeira
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

  showFirstLetterLogo(quadro) {
    return quadro.logo !== null
      && ['USJT', 'Mackenzie', 'FIAP'].indexOf(quadro.abreviacao) === -1
  }

  showLogo(quadro) {
    return quadro.logo === null
      || ['USJT', 'Mackenzie', 'FIAP'].indexOf(quadro.abreviacao) !== -1
  }

  getLogoImage(quadro) {
    if (quadro.abreviacao === 'USJT')
      return this.temporaryUsjtLogoImage

    else if (quadro.abreviacao === 'Mackenzie')
      return this.temporaryMackLogoImage

    else if (quadro.abreviacao === 'FIAP')
      return this.temporaryFiapLogoImage
  }

  redir(location) {
    this.$location.path(location)
  }
}
