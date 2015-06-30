define(['angular'], function(angular) {
  'use strict';
  
  angular.module('CategoriesCtrls')
    .controller('EditCategoryCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Category', 'Org', 'selectedCategory',
      function($scope, $http, $modalInstance, apiUrl, Category, Org, selectedCategory) {
        
        $scope.category = selectedCategory;

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