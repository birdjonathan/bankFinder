"use strict";

describe('MapController', function () {
  var $scope, $rootScope, createController, Links, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('bankFinder'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    // Links = $injector.get('Links');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MapController', {
        $scope: $scope,
        // Links: Links
      });
    };
  }));

  it('should have a data property on the $scope', function() {
    createController();
    expect($scope.map).to.be.an('object');
  });

  it('should have a getLinks methood on the $scope', function () {
    createController();
    expect($scope.geoLocate).to.be.a('function');
  });
  // it('should call getLinks() when controller is loaded', function () {
  //   var mockLinks = [{},{},{}];
  //   $httpBackend.expectGET("/api/links").respond(mockLinks);
  //   createController();
  //   $httpBackend.flush();
  //   expect($scope.data.links).to.eql(mockLinks);
  // });
});
