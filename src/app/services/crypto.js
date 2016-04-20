import crypto from 'crypto-js'

export default class CryptoService {
  gen(value) {
    return crypto.SHA512(value).toString()
  }
}
