define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', '$stateParams', '$modal', 'apiUrl', 'Items',
      function($scope, $http, $stateParams, $modal, apiUrl, Items) {

        $scope.items = [];
        
        $scope.items = Items.query({
          orgId: $scope.Org.id
        });

        console.log($scope.Org);

        $scope.showNewItemForm = $modal.open({
          templateUrl: 'app/organisations/dashboard/items/new/newItem.html',
          controller: 'NewItemCtrl',
          resolve: {
            orgId: function() {
              return $scope.Org.id;
            }
          }
        });
        
      }
    ]);
});