define(['angular'], function(angular) {
  'use strict';

  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope',
      function($scope) {
        console.log("Landing Controller");
      }
    ]);
});