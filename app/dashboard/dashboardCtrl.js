define(['angular'], function(angular) {
  'use strict';
  
  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User',
      function($scope, User) {
        console.log("Dashboard Controller");
        $scope.user = User.get();
      }
    ]);
});