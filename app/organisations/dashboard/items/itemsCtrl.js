define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', '$stateParams', '$modal', 'apiUrl', 'Items',
      function($scope, $http, $stateParams, $modal, apiUrl, Items) {
        $scope.org = {
          path: 'aimar',
          domain: 'aimarfoundation.org',
          name: 'Aimar Foundation',
          id: '558e9ee192f8676afa383848'
        };

        $scope.items = [];
        
        $scope.items = Items.query({
          orgId: $scope.org.id
        });

        $scope.showNewItemForm = $modal.open({
          templateUrl: 'app/dashboard/items/new/new.html',
          controller: 'NewItemCtrl',
          resolve: {
            orgId: function() {
              return $scope.org.id;
            }
          }
        });
        
      }
    ]);
});