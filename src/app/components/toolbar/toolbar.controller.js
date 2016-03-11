export default class ToolbarController {
  constructor($rootScope, $mdSidenav, $mdDialog, $window) {
    "ngInject";
    this.$rootScope = $rootScope
    this.$mdSidenav = $mdSidenav
    this.$mdDialog = $mdDialog
    this.$window = $window

    this.toolbar = toolbar
    this.originatorEv
  }

  announceClick(index) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index' + index)
        .ok('Nice')
        .targetEvent(this.originatorEv)
    )
  }

  toggleLeftSidenav() {
    this.$mdSidenav('left').toggle()
  }

  back() {
    this.$window.history.back()
  }

  onClickCallback(methodName) {
    this[this.onClickMethod]()
  }
}
