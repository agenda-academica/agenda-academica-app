import './filter.styl'
import controller from './filter.controller'
import template from './filter.template.jade'

export default {
  controller,
  template,
  require: {
    parent: '^representanteRead'
  }
}
