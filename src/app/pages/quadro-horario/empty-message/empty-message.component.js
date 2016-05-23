import './empty-message.styl'
import template   from './empty-message.template.jade'
import controller from './empty-message.controller'

export default {
  template,
  controller,
  bindings: {
    list: '<'
  }
}
