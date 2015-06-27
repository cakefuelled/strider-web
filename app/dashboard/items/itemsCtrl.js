define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', 'apiUrl', 'Items',
      function($scope, $http, apiUrl, Items) {
        console.log("Items controller");
        $scope.items = [];
        
        // $scope.items = Items.query({
        //   org: 'testOrg'
        // });
        // 
        
      }
    ]);
});