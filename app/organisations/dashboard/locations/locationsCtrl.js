define(['angular'], function(angular) {
  'use strict';

  angular.module('LocationCtrls', [])
    .controller('LocationCtrl', ['$scope', 'Locations',
      function($scope, Locations) {
        console.log("Location Controller");

        $scope.locations = Locations.query({
          org: $scope.Org.id
        });
      }
    ]);
});