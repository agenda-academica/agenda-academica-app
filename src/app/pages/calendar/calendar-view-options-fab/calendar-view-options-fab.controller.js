export default class CalendarViewOptionsFabController {
  constructor($scope, $timeout) {
    'ngInject'
    this.$scope = $scope
    this.$timeout = $timeout

    this.isViewFabOpen      = false
    this.viewTooltipVisible = false
    this.$scope.$watch(() => this.isViewFabOpen, this.viewTooltipVisibility())
  }

  viewTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.viewTooltipVisible = isOpen }, 400)
    }
  }

  getCssActiveCalendarViewType(type) {
    return this.parent.calendarView === type ? 'color-active' : ''
  }

  changeCalendarView(type) {
    this.parent.calendarView = type
  }
}
