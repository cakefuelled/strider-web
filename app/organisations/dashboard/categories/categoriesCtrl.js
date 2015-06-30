define(['angular'], function(angular) {
  'use strict';

  angular.module('CategoriesCtrls', [])
    .controller('CategoryCtrl', ['$scope', '$modal', 'Categories',
      function($scope, $modal, Categories) {
        console.log("Categories Controller");

        $scope.categories = Categories.query({
          org: $scope.Org.id
        });

        $scope.showNewCategoryForm = function() {
          $modal.open({
            templateUrl: 'app/organisations/dashboard/categories/new/newCategory.html',
            controller: 'NewCategoryCtrl',
            resolve: {
              Org: function() {
                return $scope.Org;
              }
            }
          });
        }
      }
    ]);
});