define(['angular', 'md5'], function(angular, md5) {
  'use strict';

  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User', 'store', '$http', 'Org',
      function($scope, User, store, $http, Org) {
        console.log("Dashboard Controller");

        $scope.Org = Org;

        function getCurrentUser() {
          $scope.user = User.get({
            id: 'me'
          }, function(data) {
            data.md5 = md5(data.email);
            return data;
          }, function(err) {
            console.log(err);
            if (err.status === 404) {
              // User not logged in
              $scope.$broadcast('event:auth-loginRequired', {});
            }
          });
        }
        getCurrentUser();

        $scope.logout = function() {
          User.logout().$promise.then(function() {
            console.log('Logged out');
            store.remove('accessToken');
            delete $http.defaults.headers.common.Authorization;
            getCurrentUser();
          });
        };
      }
    ]);
});
