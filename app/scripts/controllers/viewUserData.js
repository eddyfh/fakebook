angular.module("fbcloneApp.service.viewUserData", [])
  .factory('viewUserData', ['$http', '$q', function ($http, $q) {
    var user;
    return {
      setViewUser: function(arg){
        user = arg;
      },
      getViewUser: function(){
        return user;
      }
    };
  }]);