angular.module('fbcloneApp.controller.otherProfile', [])
  .controller('OtherProfileCtrl', ['$scope', '$http', 'userData', 'viewUserData', function ($scope, $http, userData, viewUserData) {
    $scope.user = userData.getUser();
    $scope.viewUser = viewUserData.getViewUser();
    $scope.messages = [];
    $http({method: 'GET', url: '/api/fetchMyMessages', params: {userId: $scope.viewUser._id}}).success(function(messages){
    	$scope.messages = messages;
    });
    $scope.postMessage = function(message){
    	$scope.messages.push({username: $scope.user.username, post: message});
    	$http.post('/api/postMessage', {userId: $scope.user._id, username: $scope.user.username, post: message});
    };
  }]);
