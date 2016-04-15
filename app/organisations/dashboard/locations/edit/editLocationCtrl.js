define(['angular'], function(angular) {
  'use strict';
  
  angular.module('controllers')
    .controller('EditLocationCtrl', ['$scope', '$http', 'apiUrl', 'Locations', 'Org', '$stateParams', '$timeout',
      function($scope, $http, apiUrl, Locations, Org, $stateParams, $timeout) {
        
        $scope.location = Locations.get({
          orgId: $scope.Org.id,
          id: $stateParams.id
        });

        $scope.updating = false;

        $timeout(function() {
          $scope.qr = new QRCode('editQr',{
            height: 100,
            width: 100
          });
          $scope.qr.makeCode('http://inventory.aimarfoundation.org/location/'+$scope.location.id);
        }, 1000);

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