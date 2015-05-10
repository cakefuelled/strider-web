define(['angular','md5'], function(angular, md5) {
  'use strict';
  
  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User',
      function($scope, User) {
        console.log("Dashboard Controller");
        $scope.user = User.get({
          id: 'current'
        }, function(data){
          data.md5 = md5(data.email);
          return data;
        });
      }
    ]);
});