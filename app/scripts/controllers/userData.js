angular.module("fbcloneApp.service.userData", [])
  .factory('userData', ['$http', '$q', function ($http, $q) {
    var user;
    return {
      setUser: function(arg){
        user = arg;
      },
      getUser: function(){
        return user;
      }
    };
  }]);