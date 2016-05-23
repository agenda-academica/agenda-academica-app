export default class AngularRouteResolveService {
  constructor($q, $location, $mdDialog, usuarioAuth) {
    'ngInject'
    this.$q          = $q
    this.$location   = $location
    this.$mdDialog   = $mdDialog
    this.usuarioAuth = usuarioAuth

    this.resolve()
  }

  resolve() {
    let deferred = this.$q.defer();
    if (this.usuarioAuth.has()) {
        deferred.resolve();
    } else {
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .title('Autenticação')
            .textContent(`Não há sessão de autenticação. Faça login antes de
              prosseguir (:`)
            .ok('ok')
        )
        deferred.reject();
        this.$location.url('/login');
    }
    return deferred.promise;
  }
}
