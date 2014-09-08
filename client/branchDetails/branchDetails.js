angular.module('bankFinder.main.branchDetails', ['ui.router'])

.config(function ($stateProvider) {
// The state provider handles the routing for the whole app
  $stateProvider
    .state('bankFinder.main.branchDetails', {
      url: '/branchDetails/:branchLat/:branchLng',
      templateUrl: 'branchDetails/branchDetails.tpl.html',
      controller: 'BranchDetailsController'
    });
})
// Controller for the Branch details view
.controller('BranchDetailsController', function ($scope, $stateParams, $http, BankApiFactory) {
  $scope.latitude = $stateParams.branchLat;
  $scope.longitude = $stateParams.branchLng;
// Set options for branch details map
  var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng($scope.latitude, $scope.longitude),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  // Create new info window to later be used with bank marker
  var infoWindow = new google.maps.InfoWindow();
  // Opens info window when user clicks on marker
  $scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  };
  // Creates a new map applying the previous options
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var bankIcon = '../lib/img/bank.png';
  //This function place a single marker on the map, in the future should refactor this
  // since it does basically the same thing as a similar function in the map controller
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
   // Only displays branch info when user clicks on a marker, no linking to other views 
    marker.content = '<div class="infoWindow">' + '<h4>' + bankInfo.name + '</h4>' 
    + '<p>' + 'Address: '+ bankInfo.address + '</p>' + '<p>' + 'Location Type: ' + bankInfo.locType + '</p>' 
    + '<p>' + 'Telephone: ' + bankInfo.phone + '</p>';

    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h3>' + bankInfo.bank + '</h3>' + marker.content);
      infoWindow.open($scope.map, marker);
    });  
  };
  //  Function calls factory, which makes api call to restful API and returns bank object as a promise

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
