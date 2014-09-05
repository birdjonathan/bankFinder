(function (angular) {
  "use strict";
  angular.module('bankFinder.main', ['ui.router', 'bankFinder.main.note', 'bankFinder.main.map', 'bankFinder.main.results', 'bankFinder.main.branchDetails' ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('bankFinder.main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/main.tpl.html'
      });
  });
}(angular));
