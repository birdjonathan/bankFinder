angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails/:branchLat/:branchLng',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
.controller('BranchDetailsController', function ($scope, $stateParams, $rootScope, $http) {
  $scope.message = 'Inside Branch Details State!';
  $scope.latitude = $stateParams.branchLat;
  $scope.longitude = $stateParams.branchLng;



  $http({method: 'GET', url: 'https://m.chase.com/PSRWeb/location/list.action?lat=' + $scope.latitude + '&lng=' + $scope.longitude}).
    success(function(data, status, headers, config) {
      $scope.bank = data.locations[0];
      console.log("This should be my target bank", $scope.bank);
      var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng($scope.latitude, $scope.longitude),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var placeMarker = function (bankInfo){
      $scope.bankInfo = bankInfo;
      var marker = new google.maps.Marker({
        map: $scope.map,
        name: $scope.bank.name,
        lat: $scope.latitude,
        lng: $scope.longitude,
        position: new google.maps.LatLng($scope.latitude, $scope.longitude)
      });
      }
      placeMarker($scope.bank);
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
});
