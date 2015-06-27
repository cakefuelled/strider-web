define(['angular'], function(angular) {
  'use strict';

  angular.module('UsersCtrls', [])
    .controller('UsersCtrl', ['$scope', 'OrgUsers',
      function($scope, OrgUsers) {
        console.log("Users Controller");

        $scope.users = OrgUsers.query({
          org: $scope.Org.id
        });
      }
    ]);
});