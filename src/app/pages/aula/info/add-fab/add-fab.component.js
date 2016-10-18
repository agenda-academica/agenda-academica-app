import template   from './add-fab.template.jade'
import controller from './add-fab.controller'

export default {
  template,
  controller,
  require: {
    parent: '^aulaInfo'
  }
}
