export default class HttpLoaderInterceptor {
  request(config) {
    $('.httploader').show()
    return config;
  }

  requestError(config) {
    $('.httploader').hide()
    return config;
  }

  response(res) {
    $('.httploader').hide()
    return res;
  }

  responseError(res) {
    $('.httploader').hide()
    return res;
  }
}
