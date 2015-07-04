define(['angular'], function(angular) {
  'use strict';

  angular.module('CategoriesCtrls', [])
    .controller('CategoryCtrl', ['$scope', '$modal', 'Category',
      function($scope, $modal, Category) {

        $scope.categories = Category.query({
          orgId: $scope.Org.id
        });

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
            $scope.categories.push(newCategory);
          });
        };
      }
    ]);
});
