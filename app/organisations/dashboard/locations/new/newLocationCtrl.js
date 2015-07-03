define(['angular'], function(angular) {
  'use strict';
  
  angular.module('LocationCtrls')
    .controller('NewLocationCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Locations', 'Org',
      function($scope, $http, $modalInstance, apiUrl, Locations, Org) {
        
        $scope.newLocation = new Locations();

        $scope.submit = function() {
          $scope.newLocation.$save({
            orgId: Org.id
          }, function(newLocation) {
            $modalInstance.close(newLocation);
          }, function(err) {
            alert(err);
          });
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
});