define(['angular', 'md5'], function(angular, md5) {
  'use strict';

  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User', 'store', '$http',
      function($scope, User, store, $http) {
        console.log("Dashboard Controller");

        function getCurrentUser() {
          $scope.user = User.get({
            id: 'me'
          }, function(data) {
            data.md5 = md5(data.email);
            return data;
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
