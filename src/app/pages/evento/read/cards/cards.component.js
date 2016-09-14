import './cards.styl'
import controller from './cards.controller'
import template   from './cards.template.jade'

export default {
  controller,
  template,
  require: {
    parent: '^eventoRead'
  }
}
