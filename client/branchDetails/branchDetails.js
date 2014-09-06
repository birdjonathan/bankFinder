angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails/:branchLat/:branchLng',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
.controller('BranchDetailsController', function ($scope, $stateParams, $rootScope) {
  $scope.message = 'Inside Branch Details State!';
  $scope.latitude = $stateParams.branchLat;
  console.log("This is my latitude in branch details", $scope.latitude);
  $scope.longitude = $stateParams.branchLng;
  console.log("This is my longitude in branch details", $scope.longitude);
  console.log("I have access to the banks object from maps view in the branch details controller", $rootScope.banks);
});
