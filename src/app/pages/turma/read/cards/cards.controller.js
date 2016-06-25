import temporaryUsjtLogoImage from './../../../universidade/read/usjt.jpg'
import temporaryMackLogoImage from './../../../universidade/read/mackenzie.jpg'
import temporaryFiapLogoImage from './../../../universidade/read/fiap.jpg'

export default class TurmaReadCardsController {
  constructor() {
    this.temporaryUsjtLogoImage = temporaryUsjtLogoImage
    this.temporaryMackLogoImage = temporaryMackLogoImage
    this.temporaryFiapLogoImage = temporaryFiapLogoImage
  }

  showFirstLetterLogo(universidade) {
    return universidade.logo !== null
      && ['USJT', 'Mackenzie', 'FIAP'].indexOf(universidade.abreviacao) === -1
  }

  showLogo(universidade) {
    return universidade.logo === null
      || ['USJT', 'Mackenzie', 'FIAP'].indexOf(universidade.abreviacao) !== -1
  }

  getLogoImage(universidade) {
    if (universidade.abreviacao === 'USJT')
      return this.temporaryUsjtLogoImage

    else if (universidade.abreviacao === 'Mackenzie')
      return this.temporaryMackLogoImage

    else if (universidade.abreviacao === 'FIAP')
      return this.temporaryFiapLogoImage
  }

  getUpdateHref(entity) {
    return `/#/turma/update`
      .concat(`/${entity.universidade.id}`)
      .concat(`/${entity.unidade.id}`)
      .concat(`/${entity.curso.id}`)
      .concat(`/${entity.id}`)
  }

  getUpdateAriaLabel(entity) {
    return `Alterar Turma ${entity.nome}`
  }
}
