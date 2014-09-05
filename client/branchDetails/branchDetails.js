angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
.controller('BranchDetailsController', function ($scope, $rootScope) {
  $scope.message = 'Inside Branch Details State!';
  console.log("I have access to the banks object from maps view in the branch details controller", $rootScope.banks);
});
