export default class CalendarViewOptionsFabController {
  constructor($scope, $timeout) {
    'ngInject'
    this.$scope = $scope
    this.$timeout = $timeout

    this.isViewFabOpen      = false
    this.viewTooltipVisible = false
    this.timerEventName    = 'calendar.viewTooltip.timeout.destroy'
    this.$scope.$watch(() => this.isViewFabOpen, this.viewTooltipVisibility())
  }

  viewTooltipVisibility () {
    return (isOpen) => {
      this.timer = this.$timeout(this.timerBehaviour(isOpen), 400)
      this.$scope.$on(this.timerEventName, this.destroyTimeout());
    }
  }

  timerBehaviour(isOpen) {
    return () => {
      this.viewTooltipVisible = isOpen
      this.$scope.$emit(this.timerEventName)
    }
  }

  destroyTimeout() {
    return (event) => { this.$timeout.cancel(this.timer) }
  }

  getCssActiveCalendarViewType(type) {
    return this.parent.calendarView === type ? 'color-active' : ''
  }

  changeCalendarView(type) {
    this.parent.calendarView = type
  }
}
