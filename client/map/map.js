angular.module('bankFinder.main.map', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.map', {
      url: '/map',
      templateUrl: 'map/map.tpl.html',
      controller: 'MapController'
    });
})
.controller('MapController', function ($scope, $http) { 
  $scope.message = 'Inside Map State!';
  
  var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(37.790594, -122.417317),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var placeMarkers = function (bankInfo){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            name: bankInfo.name,
            position: new google.maps.LatLng(bankInfo.lat, bankInfo.lng)
        });
        marker.content = '<div class="infoWindow">' + '<h4>' + bankInfo.name + '</h4>' + '<p>' + bankInfo.address + '</p>' + '<p>' + bankInfo.locType + '</p>' + '<p>' + bankInfo.phone + '</p>' + '</div>';
        
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
  $http({method: 'GET', url: 'https://m.chase.com/PSRWeb/location/list.action?lat=37.7833&lng=-122.4167'}).
  success(function(data, status, headers, config) {
    console.log("This is my bank info object", data);
    $scope.banks = data.locations;
    console.log("This schould be an array of locations", $scope.banks);
    
    for (var i = 0; i < $scope.banks.length; i++){
        placeMarkers($scope.banks[i]);
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
});
