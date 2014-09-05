angular.module('bankFinder.main.results', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('bankFinder.main.results', {
      url: '/results',
      templateUrl: 'results/results.tpl.html',
      controller: 'ResultsController'
    });
})
.controller('ResultsController', function ($scope) {
  $scope.message = 'Inside Results!';
});
