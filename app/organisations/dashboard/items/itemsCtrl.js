define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$modal', 'Item',
      function($scope, $modal, Item) {
        console.log('Items Controller');

        $scope.items = [];

        $scope.refreshItems = function() {
          $scope.items = Item.query({
            orgId: $scope.Org.id
          });
        };

        $scope.refreshItems();

        $scope.showNewItemForm = function() {
          var newItemModal = $modal.open({
            templateUrl: 'app/organisations/dashboard/items/new/newItem.html',
            controller: 'NewItemCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              }
            }
          });

          newItemModal.result.then(function(newItem) {
            $scope.refreshItems();
          });
        }

        $scope.showEditItemForm = function(selectedItem) {
          var editItemModal = $modal.open({
            templateUrl: 'app/organisations/dashboard/items/edit/editItem.html',
            controller: 'EditItemCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              },
              selectedItem: function() {
                return selectedItem;
              }
            }
          });

          editItemModal.result.then(function(editedItem) {
            $scope.refreshItems();
          });
        }
      }
    ]);
});