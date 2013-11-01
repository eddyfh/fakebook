// 'use strict';

var fbClone = angular.module('fbcloneApp', [
  'fbcloneApp.controller.main',
  'fbcloneApp.controller.newAccount',
  'fbcloneApp.controller.profile',
  'fbcloneApp.controller.directory',
  'fbcloneApp.controller.otherProfile',
  'fbcloneApp.service.userData',
  'fbcloneApp.service.viewUserData'
  ])
  .config(function ($routeProvider) {
    // is rootScope needed below?
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, userData){
      var deferred = $q.defer();
      $http.get('/loggedIn').success(function(user){
        // Authenticated
        if (user !== '0'){
          userData.setUser(user);
          $timeout(deferred.resolve, 0);
          }
        // Not Authenticated
        else {
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/newAccount');
        }
      });
      return deferred.promise;
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/newAccount', {
        templateUrl: 'views/newAccount.html',
        controller: 'NewAccountCtrl'
      })
      .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'DirectoryCtrl'
      })
      .when('/otherProfile', {
        templateUrl: 'views/otherProfile.html',
        controller: 'OtherProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
