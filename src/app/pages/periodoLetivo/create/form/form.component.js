import colorPickerStyle from './colorPickerStyle.css'
import template   from './form.template.jade'
import controller from './form.controller'

export default {
  colorPickerStyle,
  template,
  controller,
  require: {
    parent: '^periodoLetivoCreate'
  }
}
