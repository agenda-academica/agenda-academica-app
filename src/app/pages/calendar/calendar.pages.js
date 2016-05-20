import angular  from 'angular'
import calendar from './calendar.feature'

export default angular.module('app.pages.calendar', [])

  ////
  // Configs
  ////
  .config(calendar.routes)

  ////
  // Components
  ////
  .component('calendarViewOptionsFab' , calendar.calendarViewOptionsFab)
  .component('calendarAddEventsFab'   , calendar.calendarAddEventsFab)
  .component('calendarNavigation'     , calendar.calendarNavigation)
  .component('calendar'               , calendar.calendar)
