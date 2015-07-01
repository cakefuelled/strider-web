define(['angular'], function(angular) {
  'use strict';

  angular.module('CategoriesCtrls', [])
    .controller('CategoryCtrl', ['$scope', '$modal', 'Category',
      function($scope, $modal, Category) {

        $scope.categories = [];

        $scope.refreshCategories = function() {
          $scope.categories = Category.query({
            orgId: $scope.Org.id
          });
        };

        $scope.refreshCategories();

        $scope.showNewCategoryForm = function() {
          var newCategoryModal = $modal.open({
            templateUrl: 'app/organisations/dashboard/categories/new/newCategory.html',
            controller: 'NewCategoryCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              }
            }
          });

          newCategoryModal.result.then(function(newCategory) {
            $scope.refreshCategories();
          });
        }

        $scope.showEditCategoryForm = function(selectedCategory) {
          var editCategoryModal = $modal.open({
            templateUrl: 'app/organisations/dashboard/categories/edit/editCategory.html',
            controller: 'EditCategoryCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              },
              selectedCategory: function() {
                return selectedCategory;
              }
            }
          });

          editCategoryModal.result.then(function(editedCategory) {
            $scope.refreshCategories();
          });
        }
      }
    ]);
});