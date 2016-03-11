import angular from 'angular'

import todoList from './todoList'
import students from './students'

export default angular
  .module('app.services', [])
  .service({
    todoList,
    students
  })
