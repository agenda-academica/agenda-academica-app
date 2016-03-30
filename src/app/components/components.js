import angular from 'angular'

import todoTextInput        from './todoTextInput/todoTextInput'
import todoItemComponent    from './todoItem.component'
import todoFooterComponent  from './todoFooter.component'
import todoBatchToggle      from './todoBatchToggle.component'
import todoListFilter       from './todoListFilter.component'
import toolbar              from './toolbar/toolbar.component'
import sidenavLeft          from './sidenav/sidenav.left.component'
import sidenav              from './sidenav/sidenav.component'
import splash               from './splash/splash.component'

export default angular
  .module('app.components', [
    todoTextInput.name
  ])
  .component('splash', splash)
  .component('todoItem', todoItemComponent)
  .component('todoFooter', todoFooterComponent)
  .component('todoBatchToggle', todoBatchToggle)
  .component('todoListFilter', todoListFilter)
  .component('sidenavLeft', sidenavLeft)
  .component('sidenav', sidenav)
  .component('toolbar', toolbar)
