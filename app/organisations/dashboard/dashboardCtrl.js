define(['angular', 'md5'], function(angular, md5) {
  'use strict';

  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User', 'store', '$http', 'Org',
      function($scope, User, store, $http, Org) {
        console.log("Dashboard Controller");

        $scope.Org = Org;
        // var orgs = UserOrgs.query();

        // orgs.$promise.then(function(data){
        //   // Resolve the org object
        //   var total = data.length;
        //   for(var i = 0; i < total; i++){
        //     if(data[i].path === $stateParams.organisation){
        //       $scope.org = data[i];
        //       break;
        //     }
        //   }
        //   if($scope.org === null){
        //     $state.go('orgs');
        //     return;
        //   }
        // });

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
