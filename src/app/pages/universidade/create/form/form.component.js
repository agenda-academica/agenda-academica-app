import template   from './form.template.jade'
import controller from './form.controller'

export default {
  template,
  controller,
  require: {
    parent: '^universidadeCreate'
  }
}
