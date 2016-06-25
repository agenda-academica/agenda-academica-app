/*
centralizador, importa o controller e o template.
*/

import './form.styl'
import controller from './form.controller'
import template   from './form.template.jade'

export default {
  controller,
  template,
  require: {
    parent: '^turmaCreate'
  }
}
