define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', 'apiUrl', 'Items', '$timeout',
      function($scope, $http, apiUrl, Items, $timeout) {
        console.log("Items controller");
        $scope.items = [];

        console.log('org', $scope.Org);


        $scope.items = Items.query({
          org: $scope.Org.id
        });
      }
    ]);
});