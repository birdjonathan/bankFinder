angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
.controller('BranchDetailsController', function ($scope) {
  $scope.message = 'Inside Branch Details State!';
});
