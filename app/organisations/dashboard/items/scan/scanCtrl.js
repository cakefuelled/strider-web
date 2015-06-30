define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('ScanCtrl', ['$scope', '$http', 'apiUrl', 'Items',
      function($scope, $http, apiUrl, Items) {
        console.log("Scan controller");
      }
    ]);
});