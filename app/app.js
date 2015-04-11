/**
 * Strider - Inventory Management
 * @link https://github.com/cakefuelled/strider-web
 * @license GNU Aferro GPL v3.0 License, https://github.com/cakefuelled/strider-web/blob/master/LICENSE
 */
'use strict';

define([
  'angular',
  'ui-router',
  'login/loginCtrl',
  'constants'
], function(angular) {
  var app = angular.module('strider', [
    'ui.router',
    'constants',

    'LoginCtrls'
  ]).
  config(['$stateProvider', function($stateProvider) {
    $stateProvider.
    state('main', {
      url: '',
      abstract: true
    }).
    state('login', {
      url: '/login',
      views: {
        'main': {
          templateUrl: 'app/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  }]);

  angular.element().ready(function() {
    console.info("Strider Web initialized");
    angular.bootstrap(document, ['strider']);
  });

  return app;
});
