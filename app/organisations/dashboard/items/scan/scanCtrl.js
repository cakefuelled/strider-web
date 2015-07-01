define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('ScanCtrl', ['$scope', '$http', '$timeout', 'apiUrl', 'Item', 'Category',
      function($scope, $http, $timeout, apiUrl, Item, Category) {
        console.log("Scan controller");

        $scope.categories = Category.query({
          orgId: $scope.Org.id
        });

        $scope.scan = {
          focused: false,
          code: '',
          id: '',
          type: '',
          loading: false
        };

        $scope.categories = [];
        $scope.unidentifieds = [];

        var itemqr = new QRCode('itemqr');
        var saveqr = new QRCode('saveqr');

        $scope.$watch('scan.code', function(val){
          var protocol = 'http://',
              divider = '/';

          saveqr.makeCode('http://internal/save/0');

          if(typeof(val) === 'undefined' || val.length < protocol.length){
            return;
          }

          $scope.scan.loading = true;

          var parts = val.substr(protocol.length).split(divider);
          var scannedType = parts[1];
          var scannedId = parts[2];

          switch(scannedType) {
            case 'item':
              $scope.showItem(scannedId);
              break;
            case 'category':
              $scope.addCategory(scannedId);
              break;
            case 'save':
              $scope.saveItem();
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
            itemqr.makeCode('http://inventory.aimarfoundation.org/item/'+itemId);
          });
        }

        $scope.addCategory = function(categoryId) {
          if($scope.item) {
            //Get the category from model
            $scope.category = Category.get({
              orgId: $scope.Org.id,
              id: categoryId
            }, function(category) {
              //Add the category to the item
              $scope.item.categories.push(category);
            });
          }
        }

        $scope.updateItem = function() {
          $scope.item.$update({
            orgId: $scope.Org.id,
            id: $scope.item.id
          }, function(item) {
            alert('Success!');
          }, function(err) {
            alert(err);
          });
        }

        $scope.addUnidentified = function(type, id) {
          $scope.unidentifieds.push({type: type, id: id});
        }
      }
    ]);
});