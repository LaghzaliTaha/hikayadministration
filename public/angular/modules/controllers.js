(function(){


  var app = angular.module('controllers', []);
    app.controller('GetControllers', ['$scope','$location','$http', function($scope,$location,$http) {
            $http.get($location.url()).success(function(response) {
            var FirstString=response.replace('"','');
              $scope.name=FirstString.replace('"','') ;

            });
        }]);
  })();
