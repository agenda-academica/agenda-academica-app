export default class SidenavLeftController {
  constructor($timeout, $mdSidenav, $log) {
    'ngInject';
    this.$timeout = $timeout
    this.$mdSidenav = $mdSidenav
    this.$log = $log
  }

  close () {
    this.$mdSidenav('left').close()
      .then(function () {
        this.$log.debug("close LEFT is done");
      });
  };
}
