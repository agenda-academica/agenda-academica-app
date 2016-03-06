import angular from 'angular';

import todoList from './todoList';
import students from './students';
import toolbar from './toolbar';

export default angular
  .module('app.services', [])
  .service({
    todoList,
    students,
    toolbar
  });
