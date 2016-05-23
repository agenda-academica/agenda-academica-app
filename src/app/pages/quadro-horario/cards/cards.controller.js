import usjtLogoImage from './../../universidade/read/usjt.jpg'
import mackLogoImage from './../../universidade/read/mackenzie.jpg'
import fiapLogoImage from './../../universidade/read/fiap.jpg'

export default class QuadroHorarioCardsController {
  constructor($location) {
    'ngInject'
    this.$location = $location

    this.temporaryUsjtLogoImage = usjtLogoImage
    this.temporaryMackLogoImage = mackLogoImage
    this.temporaryFiapLogoImage = fiapLogoImage
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
