define(['angular'], function(angular) {
  'use strict';

  angular.module('controllers')
    .controller('UsersCtrl', ['$scope', 'OrgUsers',
      function($scope, OrgUsers) {
        console.log("Users Controller");

        $scope.users = OrgUsers.query({
          orgId: $scope.Org.id
        });
      }
    ]);
});