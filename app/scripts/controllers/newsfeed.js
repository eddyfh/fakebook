angular.module('fbcloneApp.controller.newsfeed', [])
  .controller('NewsfeedCtrl', ['$scope', '$http', 'userData', function ($scope, $http, userData) {
    $scope.user = userData.getUser();
    $http({method: 'GET', url: '/api/fetchFriendMessages', params: {friends: $scope.user.friends}}).success(function(messages){
      $scope.messages = messages;
    });
  }]);
