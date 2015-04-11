'use strict';

define(['angular'], function(angular) {
  angular.module('LoginCtrls', [])
    .controller('LoginCtrl', ['$scope',
      function($scope) {
        console.info("Login init");
      }
    ]);
});
