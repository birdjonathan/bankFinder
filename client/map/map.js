angular.module('bankFinder.main.map', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.map', {
      url: '/map',
      templateUrl: 'map/map.tpl.html',
      controller: 'MapController'
    });
})
.controller('MapController', function ($scope) {
  $scope.message = 'Inside Map State!';
});
