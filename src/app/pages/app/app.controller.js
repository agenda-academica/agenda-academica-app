import cardImage from './washedout.png'

export default class AppController {
  /**
   * @param {TodoList} todoList
   */
  constructor(todoList, students, $scope, $timeout, $mdSidenav, $log, $mdDialog) {
    "ngInject";
    this.todos = todoList;
    this.imagePath = cardImage;
    this.students = students;

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

  setElementTarget($event) {
    var target = $event.currentTarget
    target.blur()
    // target.blur()
  }

  getCssActiveCalendarViewType(type) {
    return this.calendarView === type ? 'md-primary' : ''
  }

  getAll() {
    this.students.api
      .index()
      .$promise
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          console.log(response[i]);
        }
      });
  }

  get() {
    this.students.api
      .show({id: 5})
      .$promise
      .then((response) => {
        console.log(response);
      });
  }

  post() {
    var data = {
      name: 'Gabriel Ramos Takeda',
      register_number: 'c9cenp2v',
      status: 2
    };
    this.students.api
      .create(data)
      .$promise
      .then((response) => {
        console.log(response);
      });
  }

  put() {
    var data = {
      name: 'Michelle Ramos Takeda',
      register_number: 'c9cenp2v',
      status: 7,
      id: 2
    };
    this.students.api
      .update(data)
      .$promise
      .then((response) => {
        console.log(response);
      });
  }

  delete() {
    this.students.api
      .destroy({id: 2})
      .$promise
      .then((response) => {
        console.log(response);
      });
  }
}
