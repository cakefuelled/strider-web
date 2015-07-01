define(['angular'], function(angular) {
  'use strict';
  
  angular.module('CategoriesCtrls')
    .controller('NewCategoryCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Category', 'Org',
      function($scope, $http, $modalInstance, apiUrl, Category, Org) {
        
        $scope.newCategory = new Category();

        $scope.submit = function() {
          $scope.newCategory.$save({
            orgId: Org.id
          }, function(newCategory) {
            $modalInstance.close(newCategory);
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