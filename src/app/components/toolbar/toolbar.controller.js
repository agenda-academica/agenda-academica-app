export default class ToolbarController {
  constructor($mdSidenav, $window, auth) {
    'ngInject';
    this.$mdSidenav = $mdSidenav
    this.$window = $window
    this.auth = auth

    this.user = this.auth.get()
    this.user.image = 'http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bc'+
      'f17c40.r92.cf1.rackcdn.com/unsplash_527bf56961712_1.JPG'
    this.sublistVisibility = 'none'

    // Bindings
    this.onClickMethod = 'toggleLeftSidenav'
    this.rightButtonEnable = 'false'
    this.rightButtonText = 'continuar'
    this.rightButtonClasses = ''
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
  onClickCallback() {
    this[this.onClickMethod]()
  }

  logout() {
    this.auth.destroy()
    this.$window.location = '/'
  }

  toggleSublistVisibility(sublist) {
    this.sublistVisibility = this.sublistVisibility === sublist
      ? 'none'
      : sublist
  }
}
