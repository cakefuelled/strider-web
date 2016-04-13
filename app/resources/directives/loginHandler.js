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
            scope.$broadcast('changeMainClass', {
              action: 'add',
              name: 'blur'
            });
            login.fadeIn('fast');
          });
          scope.$on('event:auth-loginConfirmed', function() {
            scope.$broadcast('changeMainClass', {
              action: 'remove',
              name: 'blur'
            });
            login.fadeOut();
          });
        },
        controller: ['store', '$scope', 'apiUrl', 'authService', 'User', '$http',
          function(store, $scope, apiUrl, authService, User, $http) {
            $scope.loginBtn = 'Sign in';
            $scope.loginErrors = '';

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
