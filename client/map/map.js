angular.module('bankFinder.main.map', ['ui.router', 'ngMap'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.map', {
      url: '/map',
      templateUrl: 'map/map.tpl.html',
      controller: 'MapController'
    });
})
.controller('MapController', function ($scope, $http) {
  $http({method: 'GET', url: 'https://m.chase.com/PSRWeb/location/list.action?lat=40.147864&lng=-82.990959'}).
  success(function(data, status, headers, config) {
    console.log("This is my bank info object", data);
    $scope.banks = data.locations;
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  $scope.message = 'Inside Map State!';
});
