define(['angular'], function(angular) {
  'use strict';

  angular.module('LandingCtrls', [])
    .controller('LandingCtrl', ['$scope', 'UserOrgs',
      function($scope, UserOrgs) {
        console.log("Landing Controller");
      }
    ]);
});