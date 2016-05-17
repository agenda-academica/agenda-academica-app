import events from './events.json'

export default class CalendarPageController {
  constructor($scope, $timeout) {
    'ngInject'
    this.$scope            = $scope
    this.$timeout          = $timeout

    this.calendarView      = 'month'
    this.calendarDate      = new Date()
    // important | warning | info | inverse | success | special
    this.events            = this.normalizeDates(events)

    this.isAddFabOpen      = false
    this.addTooltipVisible = false
    this.$scope.$watch(() => this.isAddFabOpen, this.addTooltipVisibility())

    this.isViewFabOpen      = false
    this.viewTooltipVisible = false
    this.$scope.$watch(() => this.isViewFabOpen, this.viewTooltipVisibility())
  }

  normalizeDates(events) {
    return events.map(event => {
      event.startsAt = new Date(event.startsAt)
      event.endsAt   = new Date(event.endsAt)
      return event
    })
  }

  viewTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.viewTooltipVisible = isOpen }, 400)
    }
  }

  addTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.addTooltipVisible = isOpen }, 400)
    }
  }

  changeCalendarView(type) {
    this.calendarView = type
  }

  getCssActiveCalendarViewType(type) {
    return this.calendarView === type ? 'color-active' : ''
  }
}
