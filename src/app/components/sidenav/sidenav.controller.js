export default class SidenavController {
  constructor($scope, $rootScope, $timeout, $mdSidenav, $log, toolbar) {
    "ngInject";
    this.$scope = $scope
    this.$timeout = $timeout
    this.$mdSidenav = $mdSidenav
    this.$log = $log
    this.toolbar = toolbar

    this.toggleLeft = this.buildDelayedToggler('left')
    this.test = 'HelloSidenav'

    this.isSidenavOpen = false;
    $rootScope.$on('handleBroadcast', function() {
      console.log('received action!');
    })
    console.log('qqq');
  }

  openLeftMenu () {
    // this.$mdSidenav('left').toggle();
    console.log('qqq');
  }
}
