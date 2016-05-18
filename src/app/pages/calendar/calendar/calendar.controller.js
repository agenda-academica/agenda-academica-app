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
  }

  normalizeDates(events) {
    return events.map(event => {
      event.startsAt = new Date(event.startsAt)
      event.endsAt   = new Date(event.endsAt)
      return event
    })
  }
}
