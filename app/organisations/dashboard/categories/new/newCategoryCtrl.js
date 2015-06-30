define(['angular'], function(angular) {
  'use strict';
  
  angular.module('CategoryCtrls')
    .controller('NewCategoryCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Categories',
      function($scope, $http, $modalInstance, apiUrl, Categories) {
        
        $scope.newCategory = { };

        $scope.submit = function() {

        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
});