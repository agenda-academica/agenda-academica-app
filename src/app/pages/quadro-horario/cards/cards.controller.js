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
    this.mockUniversidade = ['USJT', 'Mackenzie', 'FIAP']
  }

  showFirstLetterLogo(quadro) {
    return quadro.universidade.logo !== null
      && this.mockUniversidade.indexOf(quadro.universidade.abreviacao) === -1
  }

  showLogo(quadro) {
    return quadro.universidade.logo === null
      || this.mockUniversidade.indexOf(quadro.universidade.abreviacao) !== -1
  }

  getLogoImage(quadro) {
    if (quadro.universidade.abreviacao === 'USJT')
      return this.temporaryUsjtLogoImage

    else if (quadro.universidade.abreviacao === 'Mackenzie')
      return this.temporaryMackLogoImage

    else if (quadro.universidade.abreviacao === 'FIAP')
      return this.temporaryFiapLogoImage
  }

  redir(location) {
    this.$location.path(location)
  }
}
