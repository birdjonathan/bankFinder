(function(angular){
  'use strict';
  angular.module('bankFinder')

  .factory('BankApiFactory', function($http, $q){
    var urlBase = 'https://m.chase.com/PSRWeb/location/list.action?lat='
    var getData = {};
    var getData = function(latitude, longitude, callback){
      return $http({
        method: 'GET',
        url: urlBase + latitude + '&lng=' + longitude
        // url: 'https://m.chase.com/PSRWeb/location/list.action?lat=37.7526249&lng=-122.41368630000001'
      })
      .then(
        function(response){
          console.log("Here is the factory response", response);
          callback(response);
        },
        function(response){
          // called when $http.get() failes
          var errorMessage = "";
          switch(response.status){
              case 404:
                  errorMessage = "Not found";
                  break;
              case 500:
                  errorMessage = "Fatal error";
                  break;
              default:
                  errorMessage = "An error has occurred";
          }
          callback(errorMessage);
        }
      );
    };
    return {
      'getData': getData
    };
  });
}(angular));