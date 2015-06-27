define(['angular'], function(angular) {
  'use strict';

  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', 'Locations', 'Items', 'OrgUsers',
      function($scope, Locations, Items, OrgUsers) {
        console.log("Landing Controller");

        $scope.counts = {
          items: Items.get({
            org: $scope.Org.id,
            id: 'count'
          }),
          locations: Locations.get({
            org: $scope.Org.id,
            id: 'count'
          }),
          users: OrgUsers.get({
            org: $scope.Org.id,
            id: 'count'
          })
        };
      }
    ]);
});