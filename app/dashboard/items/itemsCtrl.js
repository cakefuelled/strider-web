define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', 'apiUrl', 'Items',
      function($scope, $http, apiUrl, Items) {
        $scope.items = Items.query({
          org: 'testOrg'
        });
      }
    ]);
});