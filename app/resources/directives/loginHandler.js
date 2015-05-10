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
            console.log("login required");
            scope.mainClass = 'blur';
            login.fadeIn('fast', function() {
              //main.hide();
            });
          });
          scope.$on('event:auth-loginConfirmed', function() {
            //main.show();
            login.slideUp();
          });
        },
        controller: ['$scope', 'apiUrl', 'authHandler', '$http', function($scope, apiUrl, authHandler, $http) {
          $scope.loginBtn = 'Sign in';

          $scope.login = function() {
            $scope.loginBtn = 'Signing in...';
            $http.post(apiUrl + 'auth/login', {
              email: $scope.email,
              pwd: $scope.pwd
            }).success(function(data, status, headers) {
              $scope.loginBtn = 'Sign in';
              authHandler.loginConfirmed({
                cookie: headers.cookie
              }, function() {
                console.log("Updater function");
              });

              //application of tokens to previously fired requests:
              var token = headers.cookie;

              authHandler.loginConfirmed('success', function(config) {
                config.headers.Cookie = token;
                return config;
              });
            }).
            error(function(data, status, headers, config) {
              swal("An error occured", data.message, "warning");
              $scope.loginBtn = 'Sign in';
            });
          };
        }]
      };
    });
});
