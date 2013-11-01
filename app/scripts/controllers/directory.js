angular.module('fbcloneApp.controller.directory', [])
  .controller('DirectoryCtrl', ['$scope', '$http', '$location', 'viewUserData', function ($scope, $http, $location, viewUserData) {
  	$http.get('/api/fetchUsers').success(function(users){
  		$scope.users = users;
  	});
  	$scope.getOtherProfile = function(user){
  		$location.path('/otherProfile');
      viewUserData.setViewUser(user);
  	};
  }]);
