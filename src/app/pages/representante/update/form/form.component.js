import controller from './form.controller'
import template   from './form.template.jade'

export default {
  controller,
  template,
  require: {
    parent: '^representanteUpdate'
  }
}
