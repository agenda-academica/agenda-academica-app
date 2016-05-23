import './cards.styl'
import template   from './cards.template.jade'
import controller from './cards.controller'

export default {
  template,
  controller,
  bindings: {
    list: '<'
  }
}
