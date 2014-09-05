(function (angular) {
  "use strict";
  angular.module('bankFinder.main', ['ui.router', 'bankFinder.main.note'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('bankFinder.main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/main.tpl.html'
      });
  });
}(angular));
