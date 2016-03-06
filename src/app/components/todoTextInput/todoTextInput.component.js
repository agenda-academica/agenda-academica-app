import './todoTextInput.less';
import template from './todoTextInput.template.jade'

class TodoTextInputController {
  constructor() {
    this.text = this.value || '';
  }

  save() {
    this.onSave({
      task: this.text
    });

    this.text = '';
  }

  onEscape() {
    this.onSave({
      task: this.value
    });
  }
}

export default {
  bindings: {
    placeholder: '@',
    value: '@',
    onSave: '&'
  },
  template: template,
  controller: TodoTextInputController,
  controllerAs: 'vm'
}
