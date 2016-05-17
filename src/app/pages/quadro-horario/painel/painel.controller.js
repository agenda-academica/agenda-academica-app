import usjtLogoImage from './../../universidade/read/usjt.jpg'
import provas from './provas.json'
import trabalhos from './trabalhos.json'
import eventos from './eventos.json'
import materiais from './materiais.json'

export default class QuadroHorarioPainelController {
  constructor() {
    this.temporaryUsjtLogoImage = usjtLogoImage
    this.provas = provas
    this.trabalhos = trabalhos
    this.eventos = eventos
    this.materiais = materiais
  }
}
