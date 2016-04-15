define(['angular'], function(angular) {
  'use strict';

  angular.module('controllers')
    .controller('OrganisationCtrl', ['$scope', '$http', 'apiUrl', 'UserOrgs', 'store', 'User',
      function($scope, $http, apiUrl, UserOrgs, store, User) {
        console.log('Organisation ctrl');

        $scope.organisations = UserOrgs.query({
          id: 'me'
        });

        $scope.organisations.$promise.then(function() {}, function(err) {
          if (err.status === 404) {
            // User not logged in
            $scope.$emit('event:auth-loginRequired', {});
          }
        });

        $scope.$on('event:auth-loginConfirmed', function() {
          $scope.organisations = UserOrgs.query({
            id: 'me'
          });
        });

        $scope.logout = function() {
          User.logout().$promise.then(function() {
            console.log('Logged out');
            store.remove('accessToken');
            delete $http.defaults.headers.common.Authorization;

            $scope.$emit('event:auth-loginRequired', {});
          });
        };
      }
    ]);
});
