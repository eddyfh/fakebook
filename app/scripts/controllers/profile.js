angular.module('fbcloneApp.controller.profile', [])
  .controller('ProfileCtrl', ['$scope', '$http', 'userData', function ($scope, $http, userData) {
    $scope.user = userData.getUser();
    $scope.messages = [];
    $http({method: 'GET', url: '/api/fetchMyMessages', params: {userId: $scope.user._id}}).success(function(messages){
    	$scope.messages = messages;
    });
    $scope.postMessage = function(message){
    	$scope.messages.push({username: $scope.user.username, post: message});
    	$http.post('/api/postMessage', {userId: $scope.user._id, username: $scope.user.username, post: message});
    };
  }]);
