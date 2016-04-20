export default class AuthService {
  constructor($cookies) {
    this.$cookies = $cookies
  }

  isLogged() {
    var auth = this.$cookies.getObject('auth')
    console.log(auth)
  }
}
