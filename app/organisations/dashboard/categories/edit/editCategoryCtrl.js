define(['angular'], function(angular) {
  'use strict';
  
  angular.module('CategoriesCtrls')
    .controller('EditCategoryCtrl', ['$scope', '$http', '$timeout', '$modalInstance', 'apiUrl', 'Category', 'Org', 'selectedCategory',
      function($scope, $http, $timeout, $modalInstance, apiUrl, Category, Org, selectedCategory) {
        
        $scope.category = selectedCategory;

        $timeout(function() {
          $scope.qr = new QRCode('editCategoryQr');
          $scope.qr.makeCode('http://inventory.aimarfoundation.org/category/'+$scope.category.id);
        }, 2000);

        $scope.submit = function() {
          $scope.category.$update({
            orgId: Org.id,
            id: $scope.category.id
          }, function(updatedCategory) {
            $modalInstance.close(updatedCategory);
          }, function(err) {
            alert(err);
          });
        };

        $scope.delete = function() {
          $scope.category.$remove({
            orgId: Org.id,
            id: $scope.category.id
          }, function(deletedCategory) {
            $modalInstance.close(deletedCategory);
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