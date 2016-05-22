import events from './events.json'

export default class CalendarController {
  constructor() {
    this.calendarView = 'month'
    this.calendarDate = new Date()

    ////
    // Events
    // Types:
    //    - important
    //    - warning
    //    - info
    //    - inverse
    //    - success
    //    - special
    ////
    this.events = this.normalizeDates(events)
  }

  normalizeDates(events) {
    return events.map(event => {
      event.startsAt = new Date(event.startsAt)
      event.endsAt   = new Date(event.endsAt)
      return event
    })
  }
}
