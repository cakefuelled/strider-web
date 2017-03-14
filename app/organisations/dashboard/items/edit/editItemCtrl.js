define(['angular'], function(angular) {
  'use strict';

  angular.module('controllers')
    .controller('EditItemCtrl', ['$scope', '$http', '$timeout', 'apiUrl', 'Item', 'Category', 'ItemCategory', '$q', '$stateParams',
      function($scope, $http, $timeout, apiUrl, Item, Category, ItemCategory, $q, $stateParams) {
        console.log("Edit Item Controller controller");

        $scope.savedText = false;

        var qrUrl = 'http://inventory.aimarfoundation.org',
          qrSettings = {
            height: 100,
            width: 100
          };

        $scope.itemCategories = [];
        $scope.unidentifieds = [];

        $scope.categories = Category.query({
          orgId: $scope.Org.id
        });

        $scope.categories.$promise.then(function() {
          $scope.categoriesById = normalizeById($scope.categories, 'id');
          $timeout(function() {
            $scope.categories.forEach(function(category) {
              new QRCode('qr-category-' + category.id, qrUrl + '/category/' + category.id, qrSettings);
            });
          }, 100);
        });

        var itemqr = new QRCode('itemqr', qrSettings);
          //saveqr = new QRCode('saveqr', qrSettings);

        $scope.$on('scan', function(event, parts) {
          var scannedType = parts[0],
            scannedId = parts[1];

          if (parts.length < 2) {
            // Not our format, do something else with it
            $scope.addAltId(parts[0]);
            return;
          }

          switch (scannedType) {
            case 'item':
              $scope.showItem(scannedId);
              break;
            case 'category':
              $scope.addCategory(scannedId);
              break;
            case 'internal':
                switch(scannedId){
                  case 'save':
                    $scope.updateItem();
                    break;
                  default:
                    console.warn('Unrecognised internal action: ' + scannedId);
                }

              break;
            default:
              $scope.addAltId(parts[0]);
          }
        });

        $scope.showItem = function(itemId) {
          console.log("Loading item " + itemId);
          //Get the item from model
          $scope.item = Item.get({
            orgId: $scope.Org.id,
            id: itemId
          }, function(item) {
            console.log('   Item loaded');
            itemqr.makeCode(qrUrl + '/item/' + item.id);

            // Get its categories
            $scope.itemCategories = ItemCategory.query({
              'filter[where][itemId]': itemId
            });
          });
        };

        $scope.addCategory = function(categoryId) {
          if ($scope.item) {
            //Get the category from model
            $scope.category = Category.get({
              orgId: $scope.Org.id,
              id: categoryId
            }, function (category) {
              //Add the category to the item
              var newItemCategory = new ItemCategory({
                categoryId: category.id,
                itemId: $scope.item.id
              });
              $scope.itemCategories.push(newItemCategory);
            });
          }
        };

        $scope.updateItem = function() {
          $scope.item.$update({
            orgId: $scope.Org.id,
            id: $scope.item.id
          }, function(item) {
            var deletePromises = [];
            ItemCategory.query({
              'filter[where][itemId]': item.id
            }).$promise.then(function(data) {
              data.forEach(function(category) {
                if (!category) {
                  return;
                }
                deletePromises.push(category.$delete({
                  id: category.id
                }));
              });

              $q.all(deletePromises).then(function() {
                $scope.itemCategories.forEach(function(itemCategory) {
                  itemCategory.$save().then(
                    function() {},
                    function(err) {
                      alert(err.data.error.message);
                    }
                  );
                });
                $scope.savedText = true;
                $timeout(function() {
                  $scope.savedText = false;
                }, 2000);
              });
            }, function() {
              $scope.itemCategories.forEach(function(itemCategory) {
                itemCategory.$save().then(
                  function() {},
                  function(err) {
                    alert(err.data.error.message);
                  }
                );
              });
            });

          }, function(err) {
            alert(err);
          });
        };

        $scope.addAltId = function(val) {
          if (typeof($scope.item.altIds) === 'undefined') {
            $scope.item.altIds = [];
          }
          $scope.item.altIds.push(val);
        };

        $scope.removeItem = function(list, index) {
          list.splice(index, 1);
        };

        function normalizeById(array, id) {
          var ret = {};
          array.forEach(function(element) {
            ret[element[id]] = element;
          });

          return ret;
        }

        // Load item from params
        $scope.showItem($stateParams.id);
      }
    ]);
});
