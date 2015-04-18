'use strict';

define(['angular'], function(angular) {
  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', '$http', 'apiUrl',
      function($scope, $http, apiUrl) {
        console.log("Landing Controller");
      }
    ]);
});