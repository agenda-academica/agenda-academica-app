export default class ToolbarController {
  constructor($rootScope, $mdSidenav, toolbar) {
    "ngInject";
    this.$rootScope = $rootScope
    this.$mdSidenav = $mdSidenav
    this.toolbar = toolbar
  }

  openLeftSidenav() {
    this.$mdSidenav('left').toggle();
    this.toolbar.prepareForBroadcast('Message sent by toolbar.controller')
    console.log('toolbar.controller')
  }
}
