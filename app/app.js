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
  'constants',
  'angular-utils-ui-breadcrumbs',
], function(angular) {
  var app = angular.module('strider', [
    'ui.router',
    'angularUtils.directives.uiBreadcrumbs',

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
    }).
    state('dashboard', {
        url: '',
        data: {
          displayName: 'Dashboard',
          breadcrumbProxy: 'dashboard.landing'
        },
        views: {
          'main': {
            templateUrl: 'app/dashboard/dashboard.html'
              //controller: 'LoginCtrl'
          }
        },
        abstract: true
      })
      .state('dashboard.landing', {
        url: '/',
        data: {},
        views: {
          'content': {
            templateUrl: 'app/dashboard/landing/landing.html'
              //controller: 'LoginCtrl'
          }
        }
      })
      .state('dashboard.items', {
        url: '/items',
        data: {
          displayName: 'Items'
        },
        views: {
          'content': {
            templateUrl: 'app/dashboard/items/items.html'
              //controller: 'LoginCtrl'
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
