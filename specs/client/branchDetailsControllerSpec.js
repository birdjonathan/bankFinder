describe('BranchDetailsController', function () {
  var $scope, $rootScope, $location, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('bankFinder'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('BranchDetailsController', {
        $scope: $scope,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a map object on the $scope', function() {
    expect($scope.map).to.be.an('object');
  });

  it('should have an openInfoWindow method on the $scope', function () {
    expect($scope.openInfoWindow).to.be.a('function');
  });

  // it('should be able to create new links with addLink()', function () {
  //   $httpBackend.expectPOST("/api/links").respond(201, '');
  //   $scope.addLink();
  //   $httpBackend.flush();
  //   expect($scope.loading).to.be(false);
  // });
});
