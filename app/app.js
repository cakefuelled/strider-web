/**
 * Strider - Inventory Management
 * @link https://github.com/cakefuelled/strider-web
 * @license GNU Aferro GPL v3.0 License, https://github.com/cakefuelled/strider-web/blob/master/LICENSE
 */

define([
  // Package deps
  'angular',
  'ui-router',
  'angular-resource',
  'angular-bootstrap',
  'angular-loading-bar',
  'angular-http-auth',
  'angular-auth-interceptor',
  'angular-utils-ui-breadcrumbs',
  // App deps
  'constants',
  'dashboard/items/itemsCtrl',
  'dashboard/items/itemsService',
  'dashboard/landing/landingCtrl',
  'dashboard/dashboardCtrl',
  'resources/services/userService',
  'resources/directives/loginHandler',
  'resources/directives/gravatar',

], function(angular) {
  "use strict";

  var app = angular.module('strider', [
    'ui.router',
    'ui.bootstrap',
    'angularUtils.directives.uiBreadcrumbs',
    'http-auth-interceptor',
    'authHandler',
    'loginHandler',
    'angular-loading-bar',
    'ngResource',

    'constants',

    'DashboardCtrls',
    'ItemsCtrls',
    'LandingCtrls',

    'services.users',
    'services.items',
    'strider.gravatar'
  ]).
  config(['$stateProvider', 'cfpLoadingBarProvider',
      function($stateProvider, cfpLoadingBarProvider) {
        $stateProvider.
        state('dashboard', {
            url: '',
            data: {
              displayName: 'Dashboard',
              breadcrumbProxy: 'dashboard.landing'
            },
            views: {
              'main': {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
              }
            },
            abstract: true
          })
          .state('dashboard.landing', {
            url: '/',
            data: {},
            views: {
              'content': {
                templateUrl: 'app/dashboard/landing/landing.html',
                controller: 'LandingCtrl'
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
                templateUrl: 'app/dashboard/items/items.html',
                controller: 'ItemsCtrl'
              }
            }
          });

        cfpLoadingBarProvider.includeBar = true;
      }
    ])
    .run(['$http', function($http) {

      $http.defaults.withCredentials = true;

      // Check if url includes #/ https://gist.github.com/aurbano/59a7ed66078d95fcaa9f
      if (window.location.hash.length < 1 || window.location.hash === '') {
        console.log("Added hashbang");
        window.location = window.location.origin + window.location.pathname + '#/' + window.location.search;
      }
    }]);

  angular.element().ready(function() {
    console.info("Strider Web initialized");
    angular.bootstrap(document, ['strider']);
  });

  return app;
});
