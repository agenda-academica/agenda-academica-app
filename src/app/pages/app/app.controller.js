export default class AppController {
  constructor($scope, $timeout, $mdSidenav, $log, $mdDialog) {
    'ngInject'
    this.$scope = $scope
    this.$timeout = $timeout
    this.$mdSidenav = $mdSidenav
    this.$log = $log
    this.$mdDialog = $mdDialog

    this.calendarView = 'month'
    this.calendarDate = new Date()
    this.calendarTitle = 'HelloWorldTitle'
    this.events = [
      {
        title: 'Aula 01',
        type: 'info', // important | warning | info | inverse | success | special
        startsAt: new Date(2016, 2, 30, 13, 30),
        endsAt: new Date(2016, 2, 30, 14, 30),
      },
      {
        title: 'Aula 02',
        type: 'important', // important | warning | info | inverse | success | special
        startsAt: new Date(2016, 2, 31, 12),
        endsAt: new Date(2016, 2, 31, 18),
      },
      {
        title: 'Aula 03',
        type: 'important', // important | warning | info | inverse | success | special
        startsAt: new Date(2016, 2, 31, 12),
        endsAt: new Date(2016, 2, 31, 18),
      },
      {
        title: 'Aula 04',
        type: 'important', // important | warning | info | inverse | success | special
        startsAt: new Date(2016, 2, 31, 12),
        endsAt: new Date(2016, 2, 31, 18),
      },
      {
        title: 'Aula 05',
        type: 'important', // important | warning | info | inverse | success | special
        startsAt: new Date(2016, 2, 31, 12),
        endsAt: new Date(2016, 2, 31, 18),
      }
    ];

    this.isAddFabOpen = false;
    this.addTooltipVisible = false;
    this.$scope.$watch(() => this.isAddFabOpen, this.addTooltipVisibility());

    this.isViewFabOpen = false;
    this.viewTooltipVisible = false;
    this.$scope.$watch(() => this.isViewFabOpen, this.viewTooltipVisibility());
  }

  viewTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.viewTooltipVisible = isOpen }, 400);
    };
  }

  addTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.addTooltipVisible = isOpen }, 400);
    };
  }

  changeCalendarView(type) {
    this.calendarView = type
  }

  getCssActiveCalendarViewType(type) {
    return this.calendarView === type ? 'md-primary' : ''
  }
}
