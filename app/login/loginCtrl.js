'use strict';

define(['angular', 'sweetalert'], function(angular, swal) {
  angular.module('LoginCtrls', [])
    .controller('LoginCtrl', ['$scope', '$http', 'apiUrl',
      function($scope, $http, apiUrl) {
        $scope.loginBtn = 'Sign in';

        $scope.login = function() {
          $scope.loginBtn = 'Signing in...';
          $http.post(apiUrl + 'auth/login', {
            email: $scope.email,
            pwd: $scope.pwd
          }).success(function(data, status, headers, config) {
            $scope.loginBtn = 'Sign in';
          }).
          error(function(data, status, headers, config) {
            swal("An error occured", data.message, "warning");
            $scope.loginBtn = 'Sign in';
          });;
        };
      }
    ]);
});
