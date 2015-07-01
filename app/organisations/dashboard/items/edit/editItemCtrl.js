define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('EditItemCtrl', ['$scope', '$http', '$modalInstance', '$timeout', 'apiUrl', 'Item', 'Org', 'selectedItem',
      function($scope, $http, $modalInstance, $timeout, apiUrl, Item, Org, selectedItem) {
        
        $scope.item = selectedItem;

        $scope.qr = null;

        $timeout(function() {
          $scope.qr = new QRCode('qrcode');
          $scope.qr.makeCode('http://inventory.aimarfoundation.org/item/'+$scope.item.id);
        }, 500);

        $scope.submit = function() {
          $scope.item.$update({
            orgId: Org.id,
            id: $scope.item.id
          }, function(updatedItem) {
            $modalInstance.close(updatedItem);
          }, function(err) {
            alert(err);
          });
        };

        $scope.delete = function() {
          $scope.item.$remove({
            orgId: Org.id,
            id: $scope.item.id
          }, function(deletedItem) {
            $modalInstance.close(deletedItem);
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