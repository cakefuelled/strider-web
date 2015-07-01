define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('NewItemCtrl', ['$scope', '$http', '$modalInstance', 'apiUrl', 'Item',
      function($scope, $http, $modalInstance, apiUrl, Item) {
        
        $scope.newItem = { };

        $scope.submit = function() {

        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    ]);
});