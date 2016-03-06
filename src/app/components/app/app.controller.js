import cardImage from './washedout.png'

export default class AppController {
  /**
   * @param {TodoList} todoList
   */
  constructor(todoList, students, $scope, $timeout, $mdSidenav, $log) {
    "ngInject";
    this.todos = todoList;
    this.imagePath = cardImage;
    this.students = students;

    this.$scope = $scope
    this.$timeout = $timeout
    this.$mdSidenav = $mdSidenav
    this.$log = $log

    this.users = ['Gabriel', 'Michelle', 'Daniela', 'Silvio', 'Guiomar'];
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
