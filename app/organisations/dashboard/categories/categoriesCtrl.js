define(['angular'], function(angular) {
  'use strict';

  angular.module('CategoriesCtrls', [])
    .controller('CategoryCtrl', ['$scope', 'Categories',
      function($scope, Categories) {
        console.log("Categories Controller");

        $scope.categories = Categories.query({
          org: $scope.Org.id
        });
      }
    ]);
});