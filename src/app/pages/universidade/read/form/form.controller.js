import temporaryUsjtLogoImage from './../usjt.jpg'
import temporaryMackLogoImage from './../mackenzie.jpg'
import temporaryFiapLogoImage from './../fiap.jpg'

export default class UniversidadeReadFormController {
  constructor() {
    this.temporaryUsjtLogoImage = temporaryUsjtLogoImage
    this.temporaryMackLogoImage = temporaryMackLogoImage
    this.temporaryFiapLogoImage = temporaryFiapLogoImage
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
}
