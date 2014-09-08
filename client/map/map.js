angular.module('bankFinder.main.map', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.map', {
      url: '/map',
      templateUrl: 'map/map.tpl.html',
      controller: 'MapController'
    });
})
.controller('MapController', function ($scope, $stateParams, $http, BankApiFactory) { 
  // Set up variables for Google maps API 
  var sanFrancisco = new google.maps.LatLng(37.7833, 122.4167);
  var browserSupportFlag =  new Boolean();  
 // Centers intial google map and shows entire continental USA 
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(39.50, -98.35),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  var infoWindow = new google.maps.InfoWindow();
  // Opens info window when user clicks on marker
  $scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  };
  // Creates a new google map and places map object in scope
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  $scope.markers = []; 
  // If user's Geolocation service fails or is not supported, places map over San Francisco
  var handleNoGeolocation = function(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      $scope.userLocation = sanFrancisco;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in San Francisco.");
      $scope.userLocation = sanFrancisco;
    }
    $scope.map.setCenter($scope.userLocation);
  };
  // Creates markers and places them on previously initialized map
  var placeMarkers = function (bankInfo){
    var bankIcon = '../lib/img/bank.png';
    $scope.bankInfo = bankInfo;
  // Each marker contains information from the banks object returned by the factory
    var marker = new google.maps.Marker({
        map: $scope.map,
        name: bankInfo.name,
        lat: $scope.bankInfo.lat,
        lng: $scope.bankInfo.lng,
        icon: bankIcon,
        position: new google.maps.LatLng($scope.bankInfo.lat, $scope.bankInfo.lng)
    });
    marker.content = '<div class="infoWindow">' + '<h4>' + bankInfo.name + '</h4>' 
    + '<p>' + bankInfo.address + '</p>' + '<p>' + bankInfo.locType + '</p>' 
    + '<p>' + bankInfo.phone + '</p>' 
    + '<a href="#/bankFinder/main/branchDetails/' + marker.lat + '/' + marker.lng + '"> Click here for more info </a>' + '</div>';
  
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h3>' + bankInfo.bank + '</h3>' + marker.content);
      infoWindow.open($scope.map, marker);
    });  
    $scope.markers.push(marker);
  };  
  // Attempt Geolocation using browser
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.coordinates = position.coords;
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $scope.userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      $scope.map.setCenter($scope.userLocation); 
      $scope.map.setZoom(14);
      BankApiFactory.getData(latitude, longitude, function(response){
        if (response.status === 200){
          $scope.banks = response.data.locations;
          console.log("This is my banks response object in the controller", response);
          var userMarker = new google.maps.Marker({
            map: $scope.map,
            lat: $scope.coordinates.latitude,
            lng: $scope.coordinates.longitude,
            position: new google.maps.LatLng($scope.coordinates.latitude, $scope.coordinates.longitude)
          });
          for (var i = 0; i < $scope.banks.length; i++){
              placeMarkers($scope.banks[i]);
          }
        } else{
            console.log("The following error occured:", response);
            alert(response);
          }
        });
      })
  } else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
});


      
    // $http({method: 'GET', url: 'https://m.chase.com/PSRWeb/location/list.action?lat=' + $scope.coordinates.latitude + '&lng=' + $scope.coordinates.longitude}).
    // success(function(data, status, headers, config) {
    //   console.log("This is my bank info object", data);
    //   $scope.banks = data.locations;
    //   console.log("This schould be an array of locations", $scope.banks);
    //   //  This places a red marker for the user's position 
    //   var userMarker = new google.maps.Marker({
    //    map: $scope.map,
    //     lat: $scope.coordinates.latitude,
    //     lng: $scope.coordinates.longitude,
    //     position: new google.maps.LatLng($scope.coordinates.latitude, $scope.coordinates.longitude)
    //   });

    //   for (var i = 0; i < $scope.banks.length; i++){
    //       placeMarkers($scope.banks[i]);
    //   }
    // }).
    // error(function(data, status, headers, config) {
    //   // called asynchronously if an error occurs
    //   // or server returns response with an error status.
    // });      
    // }, function() {
    //   handleNoGeolocation(browserSupportFlag);
  // Browser doesn't support Geolocation


