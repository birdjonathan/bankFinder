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

   // Attempt Geolocation using browser
  var geoLocate = function(){
    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.coordinates = position.coords;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $scope.userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        $scope.map.setCenter($scope.userLocation); 
        $scope.map.setZoom(14);
        // After querying user's location, place marker on map to represent user position
        var userMarker = new google.maps.Marker({
          map: $scope.map,
          lat: latitude,
          lng: longitude,
          position: new google.maps.LatLng(latitude, longitude)
        });
        // Function calls factory, which makes api call to restful API and returns bank object as a promise
        BankApiFactory.getData(latitude, longitude, function(response){
          if (response.status === 200){
            $scope.banks = response.data.locations;
            console.log("This is my banks response object in the controller", response);
          // Place all markers on google map
            for (var i = 0; i < $scope.banks.length; i++){
                placeMarker($scope.banks[i]);
            }
          } else{  // Error handling
              console.log("The following error occured:", response);
              alert(response);
            }
          });
        })
    } else {  // If the browser does not support geolocation, tell user
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }
  }




 // Centers intial google map and shows entire continental USA 
  var initializeMap = function (){
    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(39.50, -98.35),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    // Creates a new google map and places map object in scope
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    geoLocate();
  };

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


  // Creates one marker and places it on previously initialized map
  var placeMarker = function (bankInfo){
    $scope.markers = []; 
    var bankIcon = '../lib/img/bank.png';
    $scope.bankInfo = bankInfo;
  // Each marker contains information from the banks object returned by the factory
    var marker = new google.maps.Marker({
        map: $scope.map,
        name: bankInfo.name,
        lat: bankInfo.lat,
        lng: bankInfo.lng,
        icon: bankIcon,
        position: new google.maps.LatLng($scope.bankInfo.lat, $scope.bankInfo.lng)
    });
    marker.content = '<div class="infoWindow">' + '<h4>' + bankInfo.name + '</h4>' 
    + '<p>' + 'Address: '+ bankInfo.address + '</p>' + '<p>' +'Location Type: '+ bankInfo.locType + '</p>' 
    + '<p>'+'Telephone: ' + bankInfo.phone + '</p>' 
    + '<a href="#/bankFinder/main/branchDetails/' + marker.lat + '/' + marker.lng + '"> Click here for more info </a>' + '</div>';
      var infoWindow = new google.maps.InfoWindow();
    // Opens info window when user clicks on marker
    $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h3>' + bankInfo.bank + '</h3>' + marker.content);
      infoWindow.open($scope.map, marker);
    });  
    $scope.markers.push(marker);
  };  

  initializeMap();
  google.maps.event.addDomListener(window, 'resize', initializeMap);

});



