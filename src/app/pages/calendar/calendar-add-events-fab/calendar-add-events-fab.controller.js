export default class CalendarAddEventsFabController {
  constructor($scope, $timeout) {
    'ngInject'
    this.$scope   = $scope
    this.$timeout = $timeout

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
}
