angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails/:branchLat/:branchLng',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
.controller('BranchDetailsController', function ($scope, $stateParams, $http, BankApiFactory) {
  $scope.latitude = $stateParams.branchLat;
  $scope.longitude = $stateParams.branchLng;
  var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng($scope.latitude, $scope.longitude),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var bankIcon = '../lib/img/bank.png';
  var placeMarker = function (bankInfo){
    $scope.bankInfo = bankInfo;
    var marker = new google.maps.Marker({
      map: $scope.map,
      name: $scope.bankInfo.name,
      lat: $scope.latitude,
      lng: $scope.longitude,
      icon: bankIcon,
      position: new google.maps.LatLng($scope.latitude, $scope.longitude)
    });
  };
  BankApiFactory.getData($scope.latitude, $scope.longitude, function(response){
    if (response.status === 200){
      $scope.bank = response.data.locations[0];

      console.log("This is my banks response object in the  branch details controller", response);
    // Place single marker representing chosen bank
      placeMarker($scope.bank);
      } else{  // Error handling
          console.log("The following error occured:", response);
          alert(response);
      }
  });
});
