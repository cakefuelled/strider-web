define(['angular'], function(angular) {
  'use strict';

  angular.module('ItemsCtrls')
    .controller('ScanCtrl', ['$scope', '$http', '$timeout', 'apiUrl', 'Item', 'Category', 'ItemCategory',
      function($scope, $http, $timeout, apiUrl, Item, Category, ItemCategory) {
        console.log("Scan controller");

        var qrUrl = 'http://inventory.aimarfoundation.org',
          qrSettings = {
            height: 100,
            width: 100
          };

        $scope.scan = {
          focused: false,
          code: '',
          id: '',
          type: '',
          loading: false
        };

        $scope.itemCategories = [];
        $scope.unidentifieds = [];

        $scope.categories = Category.query({
          orgId: $scope.Org.id
        });
        $scope.categories.$promise.then(function() {
          $timeout(function() {
            $scope.categories.forEach(function(category) {
              new QRCode('qr-category-' + category.id, qrUrl + '/category/' + category.id, qrSettings);
            });
          }, 100);
        });

        var itemqr = new QRCode('itemqr', qrSettings),
          saveqr = new QRCode('saveqr', qrSettings);

        $scope.$watch('scan.code', function(val) {
          var protocol = 'http://',
            divider = '/';

          saveqr.makeCode('http://internal/save/0');

          if (typeof(val) === 'undefined' || val.length < 1) {
            return;
          }

          console.log("Scanned " + val);

          $scope.scan.loading = true;

          var parts = val.substr(protocol.length).split(divider);
          var scannedType = parts[1];
          var scannedId = parts[2];

          if (parts.length < 3) {
            // Not our format, do something else with it
            if (scannedType && scannedId) {
              $scope.addUnidentified(scannedType, scannedId);
            } else {
              $scope.addUnidentified('Unknown', val);
            }

            $scope.scan.code = '';
            return;
          }

          switch (scannedType) {
            case 'item':
              $scope.showItem(scannedId);
              break;
            case 'category':
              $scope.addCategory(scannedId);
              break;
            case 'save':
              $scope.updateItem();
              break;
            default:
              $scope.addUnidentified(scannedType, scannedId);
          }

          $scope.scan.code = '';

          $scope.scan.loading = false;
        });

        $scope.showItem = function(itemId) {
          //Get the item from model
          $scope.item = Item.get({
            orgId: $scope.Org.id,
            id: itemId
          }, function(item) {
            $scope.scan.id = itemId;
            itemqr.makeCode(qrUrl + '/item/' + itemId);

            // Get its categories
            $scope.itemCategories = ItemCategory.query({
              'filter[where][itemId]' : itemId 
            });
          });
        }

        $scope.addCategory = function(categoryId) {
          if ($scope.item) {
            //Get the category from model
            $scope.category = Category.get({
              orgId: $scope.Org.id,
              id: categoryId
            }, function(category) {
              //Add the category to the item
              var newItemCategory = new ItemCategory({
                categoryId: category.id,
                itemId: $scope.item.id
              });
              $scope.itemCategories.push(newItemCategory);
            });
          }
        }

        $scope.updateItem = function() {
          $scope.item.$update({
            orgId: $scope.Org.id,
            id: $scope.item.id
          }, function(item) {
            $scope.itemCategories.forEach(function(itemCategory){
              itemCategory.$save().then(
                function() {
                  alert('Item updated');
                }, function(err) {
                  alert(err.data.error.message);
                }
              );
            });
          }, function(err) {
            alert(err);
          });
        }

        $scope.addUnidentified = function(type, id) {
          $scope.unidentifieds.push({
            type: type,
            id: id
          });
        };

        $timeout(function(){
          $('#scanArea').focus();
        },100);
      }
    ]);
});
