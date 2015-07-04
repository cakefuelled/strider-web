define(['angular'], function(angular) {
  'use strict';
  
  angular.module('LocationCtrls')
    .controller('EditLocationCtrl', ['$scope', '$http', 'apiUrl', 'Locations', 'Org', '$stateParams',
      function($scope, $http, apiUrl, Locations, Org, $stateParams) {
        
        $scope.location = Locations.get({
          orgId: $scope.Org.id,
          id: $stateParams.id
        });

        $scope.updating = false;

        $scope.submit = function() {
          $scope.updating = true;

          $scope.location.$update({
            orgId: Org.id,
            id: $stateParams.id
          }, function(newLocation) {
            console.log('saved');
            $scope.updating = false;
          }, function(err) {
            alert(err);
            $scope.updating = false;
          });
        };
      }
    ]);
});