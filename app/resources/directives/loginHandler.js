define(['angular', 'jquery', 'sweetalert'], function(angular, $, swal) {
  "use strict";

  angular.module('directives')
    .directive('loginHandler', function() {
      return {
        restrict: 'C',
        link: function(scope, elem) {
          // Once Angular is started, remove class:
          elem.removeClass('waiting-for-angular');

          var login = $('#loginView');

          scope.$on('event:auth-loginRequired', function() {
            login.fadeIn('fast');
          });
          scope.$on('event:auth-loginConfirmed', function() {
            login.fadeOut();
          });
        },
        controller: ['store', '$scope', 'apiUrl', 'authService', 'User', '$http', 'Page',
          function(store, $scope, apiUrl, authService, User, $http, Page) {
            $scope.loginBtn = 'Sign in';
            $scope.loginErrors = '';

            $scope.$on('event:auth-loginRequired', function() {
              Page.blur();
            });

            $scope.$on('event:auth-loginConfirmed', function() {
              Page.unblur();
            });

            $scope.login = function() {
              $scope.loginBtn = 'Signing in...';
              $scope.loginErrors = '';

              // Set the TTL of the token to 2 weeks
              $scope.user.ttl = 1000 * 60 * 60 * 24 * 7 * 2;

              User.login($scope.user).$promise.then(
                function(accessToken){
                  $scope.loginBtn = 'Sign in';

                  // Set the header
                  $http.defaults.headers.common.Authorization = accessToken.id;

                  // Store it for later
                  store.set('accessToken', accessToken.id);

                  authService.loginConfirmed('success', function(config) {
                    return config;
                  });
                }, function(err){
                  console.log("Failed", err);

                  $scope.loginErrors = err.data.error.message;
                  $scope.loginBtn = 'Sign in';
                });
            };
          }
        ]
      };
    });
});
