define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('NewItemCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Items',
      function($scope, $http, $modalInstance, apiUrl, Items) {
        
        $scope.newItem = { };

        $scope.submit = function() {

        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
});