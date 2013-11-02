angular.module('fbcloneApp.controller.header', [])
  .controller('HeaderCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.logout = function(){
    	$http({method: 'GET', url: '/logout'}).success(function(){
      $location.path('/');
	    });
    };
  }]);
