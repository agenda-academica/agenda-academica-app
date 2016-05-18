import template   from './calendar-view-options-fab.template.jade'
import controller from './calendar-view-options-fab.controller'

export default {
  template,
  controller,
  require: {
    parent: '^calendar'
  }
}
