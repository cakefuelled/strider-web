'use strict';

define([
  'angular',
  'ui-router'
  //'login/login.html'
], function(angular /* view1, view2*/ ) {
  // Declare app level module which depends on views, and components
  return angular.module('strider', [
    'ui.router'
    //'myApp.view1',
    //'myApp.view2'
  ]).
  config(['$stateProvider', function($stateProvider) {
    // $stateProvider.otherwise({
    //   redirectTo: '/login'
    // });

    $stateProvider.
    state('main', {
      url: '',
      abstract: true
    }).
    state('login', {
      url: '/login',
      views: {
        'main': 'login/login.html'
      }
    });
  }]);
});
