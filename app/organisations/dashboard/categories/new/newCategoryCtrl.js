define(['angular'], function(angular) {
  'use strict';
  
  angular.module('CategoriesCtrls')
    .controller('NewCategoryCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Categories',
      function($scope, $http, $modalInstance, apiUrl, Category) {
        
        $scope.newCategory = new Category();

        $scope.submit = function() {
          var save = $scope.newCategory.$save();
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
});