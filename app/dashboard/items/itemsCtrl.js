define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', 'apiUrl',
      function($scope, $http, apiUrl) {
        console.log("Items Controller");
      }
    ]);
});