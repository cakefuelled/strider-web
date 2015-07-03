define(['angular'], function(angular) {
  'use strict';

  angular.module('LocationCtrls', [])
    .controller('LocationCtrl', ['$scope', '$modal', 'Locations',
      function($scope, $modal, Locations) {
        console.log("Location Controller");

        $scope.locations = [];

        $scope.refreshLocations = function() {
          $scope.locations = Locations.query({
            orgId: $scope.Org.id
          });
        };

        $scope.refreshLocations();

        $scope.showNewLocationForm = function() {
          var newLocationModal = $modal.open({
            templateUrl: 'app/organisations/dashboard/locations/new/newLocation.html',
            controller: 'NewLocationCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              }
            }
          });

          newLocationModal.result.then(function(newLocation) {
            $scope.refreshLocations();
          });
        }

      }
    ]);
});