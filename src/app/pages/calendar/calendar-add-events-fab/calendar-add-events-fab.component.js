import template   from './calendar-add-events-fab.template.jade'
import controller from './calendar-add-events-fab.controller'

export default {
  template,
  controller,
  require: {
    parent: '^calendar'
  }
}
