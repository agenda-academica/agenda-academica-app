export default class Toolbar
{
  constructor($rootScope) {
    "ngInject";
    this.sharedMessage = '';
    this.$rootScope = $rootScope
  }

  prepareForBroadcast(message) {
    console.log(message)
    this.sharedMessage = message
    this.broadcastItem()
  }

  broadcastItem() {
    console.log('Broadcasted item')
    this.$rootScope.$broadcast('handleBroadcast')
  }
}
