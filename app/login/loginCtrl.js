'use strict';

define(['angular'], function(angular) {
  angular.module('LoginCtrls', [])
    .controller('LoginCtrl', ['$scope', '$http', 'apiUrl',
      function($scope, $http, apiUrl) {
        $scope.loginBtn = 'Login';

        console.log(apiUrl);

        $scope.login = function(){
          $http.post(apiUrl+'auth/login', {
            email: $scope.email,
            pwd: $scope.pwd
          });
        };
      }
    ]);
});
