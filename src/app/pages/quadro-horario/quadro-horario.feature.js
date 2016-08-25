import routes from './quadro-horario.routes'

import emptyMessage  from './empty-message/empty-message.component'
import cards         from './cards/cards.component'
import cardAddAula   from './card-add-aula/card-add-aula.component'
import quadroHorario from './quadro-horario/quadro-horario.component'

export default {
  config: {
    routes,
  },

  component: {
    emptyMessage,
    cards,
    cardAddAula,
    quadroHorario,
  },
}
