export default class SplashController {
  constructor($location, auth) {
    'ngInject'
    this.$location = $location
    this.auth = auth

    this.verifyAuth()
  }

  verifyAuth() {
    if (this.auth.has()) this.$location.path('/welcome')
  }
}
