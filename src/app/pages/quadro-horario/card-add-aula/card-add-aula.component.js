import './card-add-aula.styl'
import template   from './card-add-aula.template.jade'
import controller from './card-add-aula.controller'

export default {
  template,
  controller,
  bindings: {
    weekDay: '<'
  }
}
