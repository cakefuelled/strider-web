define(['angular'], function(angular) {
  'use strict';

  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', 'Items',
      function($scope, Items) {
        console.log("Landing Controller");

        $scope.counts = {
          items: Items.get({
            org: $scope.Org.id,
            id: 'count'
          })
        };
      }
    ]);
});