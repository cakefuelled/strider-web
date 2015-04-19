'use strict';

define(['angular'], function(angular) {
  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', 'currentUser',
      function($scope, currentUser) {
        console.log("Landing Controller", currentUser);
      }
    ]);
});