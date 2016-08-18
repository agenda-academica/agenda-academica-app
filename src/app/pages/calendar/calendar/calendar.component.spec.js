import { expect } from 'chai'
import moment from 'moment'

describe('app/pages/calendar/calendar.component', () => {
  let element
  let scope

  beforeEach(angular.mock.module('app'))
  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new()
    element = angular.element('<calendar></calendar>')
    element = $compile(element)(scope)
    scope.$apply()
  }))

  it('should render 1 toolbar component', () => {
    expect(element.find('toolbar')).to.have.length(1)
  })

  it('should render toolbar component with title as "Calendário"', () => {
    expect(element.find('toolbar').attr('title')).to.equal('Calendário')
  })

  it('should render 1 calendar add events fab component', () => {
    expect(element.find('calendar-add-events-fab')).to.have.length(1)
  })

  it('should render 1 calendar view options fab component', () => {
    expect(element.find('calendar-view-options-fab')).to.have.length(1)
  })

  it('should render 2 calendar navigation components', () => {
    expect(element.find('calendar-navigation')).to.have.length(2)
  })

  it('should render 1 calendar date div', () => {
    expect(element[0].querySelectorAll('.calendar-date')).to.have.length(1)
  })

  it('should render calendar date div with current date in MM/YYYY format', () => {
    const date = element[0].querySelector('.calendar-date')
    expect(date.innerText).to.have.string(moment().format('MM/YYYY'))
  })

  it('should render 1 mwl calendar component', () => {
    expect(element.find('mwl-calendar')).to.have.length(1)
  })
})
