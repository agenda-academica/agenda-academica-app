export default class ToolbarController {
  constructor($mdSidenav, $window, auth) {
    "ngInject";
    this.$mdSidenav = $mdSidenav
    this.$window = $window
    this.auth = auth
  }

  /**
   * Template action method.
   */
  toggleLeftSidenav() {
    this.$mdSidenav('left').toggle()
  }

  /**
   * Template action method.
   */
  back() {
    this.$window.history.back()
  }

  /**
   * Template action method.
   */
  onClickCallback(methodName) {
    this[this.onClickMethod]()
  }

  logout() {
    this.auth.destroy()
    this.$window.location = '/'
  }
}
