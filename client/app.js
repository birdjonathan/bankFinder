(function (angular) {
  'use strict';
  angular.module('bankFinder', [
    'ngFx',
    'ui.router',
    'bankFinder.main'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/bankFinder/main/note');

    $stateProvider
      .state('bankFinder', {
        url: '/bankFinder',
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  });
}(angular));



