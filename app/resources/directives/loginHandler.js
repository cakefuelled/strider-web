define(['angular', 'jquery', 'sweetalert'], function(angular, $, swal) {
  "use strict";

  angular.module('loginHandler', [])
    .directive('loginHandler', function() {
      return {
        restrict: 'C',
        link: function(scope, elem) {
          // Once Angular is started, remove class:
          elem.removeClass('waiting-for-angular');

          var login = $('#loginView');

          scope.$on('event:auth-loginRequired', function() {
            scope.mainClass = 'blur';
            login.fadeIn('fast');
          });
          scope.$on('event:auth-loginConfirmed', function() {
            scope.mainClass = '';
            login.fadeOut();
          });
        },
        controller: ['$scope', 'apiUrl', 'authService', '$http', function($scope, apiUrl, authService, $http) {
          $scope.loginBtn = 'Sign in';
          $scope.loginErrors = '';

          $scope.login = function() {
            $scope.loginBtn = 'Signing in...';
            $scope.loginErrors = '';

            $http({
              url: apiUrl + 'auth/login',
              method: 'POST',
              ignoreAuthModule: true,
              data: {
                email: $scope.email,
                pwd: $scope.pwd
              }
            }).success(function(data, status, headers) {
              $scope.loginBtn = 'Sign in';

              authService.loginConfirmed('success', function(config) {
                return config;
              });
            }).
            error(function(data) {
              //swal("An error occured", data.message, "warning");
              $scope.loginErrors = data.message;
              $scope.loginBtn = 'Sign in';
            });
          };
        }]
      };
    });
});
