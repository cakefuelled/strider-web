define(['angular'], function(angular) {
  'use strict';
  
  angular.module('PrintCtrls', [])
    .controller('PrintCtrl', ['$scope', '$http', 'apiUrl', 'Items',
      function($scope, $http, apiUrl, Items) {
        console.log("Print controller");

        $scope.items = Items.query({
          orgId: $scope.Org.id
        });
      }
    ]);
});