export default class CalendarAddEventsFabController {
  constructor($scope, $timeout, $location) {
    'ngInject'
    this.$scope    = $scope
    this.$timeout  = $timeout
    this.$location = $location

    this.isAddFabOpen      = false
    this.addTooltipVisible = false
    this.timerEventName    = 'calendar.addTooltip.timeout.destroy'
    this.$scope.$watch(() => this.isAddFabOpen, this.addTooltipVisibility())
  }

  addTooltipVisibility () {
    return (isOpen) => {
      this.timer = this.$timeout(this.timerBehaviour(isOpen), 400)
      this.$scope.$on(this.timerEventName, this.destroyTimeout());
    }
  }

  timerBehaviour(isOpen) {
    return () => {
      this.addTooltipVisible = isOpen
      this.$scope.$emit(this.timerEventName)
    }
  }

  destroyTimeout() {
    return (event) => { this.$timeout.cancel(this.timer) }
  }

  //
  // Redirects
  //
  redirAddEvento() {
    this.$location.path('/evento/create')
  }
}
