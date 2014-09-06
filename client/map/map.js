angular.module('bankFinder.main.map', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.map', {
      url: '/map',
      templateUrl: 'map/map.tpl.html',
      controller: 'MapController'
    });
})
.controller('MapController', function ($scope, $stateParams, $rootScope, $http) { 
  var siberia = new google.maps.LatLng(60, 105);
  var browserSupportFlag =  new Boolean();

  $scope.message = 'Inside Map State!';
  
  var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.50, -98.35),
        // center: new google.maps.LatLng(37.790594, -122.417317),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);


  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("This is my position", position);
      $scope.coordinates = position.coords;
      console.log("this is my latitude", $scope.coordinates.latitude);
      $scope.userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      $scope.map.setCenter($scope.userLocation);
      $scope.map.setZoom(14);

    $http({method: 'GET', url: 'https://m.chase.com/PSRWeb/location/list.action?lat=' + $scope.coordinates.latitude + '&lng=' + $scope.coordinates.longitude}).
    success(function(data, status, headers, config) {
      console.log("This is my bank info object", data);
      $rootScope.banks = data.locations;
      console.log("This schould be an array of locations", $rootScope.banks);
      
      for (var i = 0; i < $rootScope.banks.length; i++){
          placeMarkers($rootScope.banks[i]);
      }
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });      
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      $scope.userLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      $scope.userLocation = siberia;
    }
    $scope.map.setCenter($scope.userLocation);
  }

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var placeMarkers = function (bankInfo){
        $scope.bankInfo = bankInfo;
        var marker = new google.maps.Marker({
            map: $scope.map,
            name: bankInfo.name,
            lat: $scope.bankInfo.lat,
            lng: $scope.bankInfo.lng,
            position: new google.maps.LatLng($scope.bankInfo.lat, $scope.bankInfo.lng)
        });
        marker.content = '<div class="infoWindow">' + '<h4>' + bankInfo.name + '</h4>' 
        + '<p>' + bankInfo.address + '</p>' + '<p>' + bankInfo.locType + '</p>' 
        + '<p>' + bankInfo.phone + '</p>' 
        + '<a ui-sref="bankFinder.main.branchDetails({branchLat:' + bankInfo.lat + ', branchLng:' + bankInfo.lng + '})"> Click here for more info </a>' + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h3>' + bankInfo.bank + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
});
