define(['angular'], function(angular) {
  'use strict';
  
  angular.module('controllers')
    .controller('EditCategoryCtrl', ['$scope', '$http', '$timeout', 'apiUrl', 'Category', 'Org', '$stateParams', '$state',
      function($scope, $http, $timeout, apiUrl, Category, Org, $stateParams, $state) {
        
        $scope.category = Category.get({
          orgId: $scope.Org.id,
          id: $stateParams.id
        });

        $scope.updating = false;

        $timeout(function() {
          $scope.qr = new QRCode('editCategoryQr',{
            height: 100,
            width: 100
          });
          $scope.qr.makeCode('http://inventory.aimarfoundation.org/category/'+$scope.category.id);
        }, 1000);

        $scope.submit = function() {
          $scope.updating = true;

          $scope.category.$update({
            orgId: Org.id,
            id: $scope.category.id
          }, function(updatedCategory) {
            $scope.updating = false;
          }, function(err) {
            alert(err);
            $scope.updating = false;
          });
        };

        $scope.delete = function() {
          $scope.updating = true;

          $scope.category.$remove({
            orgId: Org.id,
            id: $scope.category.id
          }, function() {
            $state.go('orgs.dashboard.categories');
          }, function(err) {
            alert(err);
            $scope.updating = false;
          });
        };
      }
    ]);
});