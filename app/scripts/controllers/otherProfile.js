angular.module('fbcloneApp.controller.otherProfile', [])
  .controller('OtherProfileCtrl', ['$scope', '$http', 'userData', 'viewUserData', function ($scope, $http, userData, viewUserData) {
    $scope.user = userData.getUser();
    $scope.viewUser = viewUserData.getViewUser();
    $scope.messages = [];
    $http({method: 'GET', url: '/api/fetchMyMessages', params: {userId: $scope.viewUser._id}}).success(function(messages){
    	$scope.messages = messages;
    });
    $scope.addFriend = function(){
      $http.post('/api/addFriend', {userId: $scope.user._id, friendId: $scope.viewUser._id}).success(function(){
        console.log('Friend added');
      });
    }
  }]);
