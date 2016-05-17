export default class ToolbarController {
  constructor($localStorage, $mdSidenav, $window, auth) {
    'ngInject';
    this.$localStorage = $localStorage
    this.$mdSidenav = $mdSidenav
    this.$window = $window
    this.auth = auth

    this.user = this.auth.get()
    this.user.image = 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-xpf1/'+
      't31.0-8/12646877_1124405127599695_6885608114609715521_o.jpg'
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
    this.$localStorage.$reset()
    this.$window.location = '/'
  }

  toggleSublistVisibility(sublist) {
    this.sublistVisibility = this.sublistVisibility === sublist
      ? 'none'
      : sublist
  }
}
