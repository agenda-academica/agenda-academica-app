export default class CalendarAddEventsFabController {
  constructor($scope, $timeout) {
    'ngInject'
    this.$scope = $scope
    this.$timeout = $timeout

    this.isAddFabOpen      = false
    this.addTooltipVisible = false
    this.$scope.$watch(() => this.isAddFabOpen, this.addTooltipVisibility())
  }

  addTooltipVisibility () {
    return (isOpen) => {
      this.$timeout(() => { this.addTooltipVisible = isOpen }, 400)
    }
  }
}
