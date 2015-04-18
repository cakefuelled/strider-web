'use strict';

define(['angular'], function(angular) {
  angular.module('ItemsCtrls', [])
    .controller('ItemsCtrl', ['$scope', '$http', 'apiUrl',
      function($scope, $http, apiUrl) {
        console.log("Items Controller");
      }
    ]);
});