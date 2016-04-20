import angular from 'angular'

import toolbar              from './toolbar/toolbar.component'
import sidenavLeft          from './sidenav/sidenav.left.component'
import sidenav              from './sidenav/sidenav.component'
import splash               from './splash/splash.component'

export default angular
  .module('app.components', [])
  .component('splash', splash)
  .component('sidenavLeft', sidenavLeft)
  .component('sidenav', sidenav)
  .component('toolbar', toolbar)
