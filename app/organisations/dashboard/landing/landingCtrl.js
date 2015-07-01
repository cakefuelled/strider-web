define(['angular'], function(angular) {
  'use strict';

  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', 'Locations', 'Item', 'OrgUsers', 'Category',
      function($scope, Locations, Item, OrgUsers, Category) {
        console.log("Landing Controller");

        $scope.counts = {
          items: Item.get({
            orgId: $scope.Org.id,
            id: 'count'
          }),
          locations: Locations.get({
            org: $scope.Org.id,
            id: 'count'
          }),
          users: OrgUsers.get({
            org: $scope.Org.id,
            id: 'count'
          }),
          categories: Category.get({
            orgId: $scope.Org.id,
            id: 'count'
          })
        };
      }
    ]);
});