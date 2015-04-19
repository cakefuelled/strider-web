/**
 * Strider - Inventory Management
 * @link https://github.com/cakefuelled/strider-web
 * @license GNU Aferro GPL v3.0 License, https://github.com/cakefuelled/strider-web/blob/master/LICENSE
 */

define([
  // Package deps
  'angular',
  'ui-router',
  'angular-bootstrap',
  'angular-utils-ui-breadcrumbs',
  'angular-auth-interceptor',
  'angular-loading-bar',
  // App deps
  'login/loginCtrl',
  'dashboard/items/itemsCtrl',
  'dashboard/landing/landingCtrl',
  'resources/services/userService',
  'constants',

], function(angular) {
  "use strict";

  var app = angular.module('strider', [
    'ui.router',
    'ui.bootstrap',
    'angularUtils.directives.uiBreadcrumbs',
    'authHandler',
    'angular-loading-bar',

    'constants',

    'LoginCtrls',
    'ItemsCtrls',
    'LandingCtrls',

    'UserService'
  ]).
  config(['$stateProvider', 'cfpLoadingBarProvider',
      function($stateProvider, cfpLoadingBarProvider) {
        $stateProvider.
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
                controller: 'LandingCtrl',
                resolve: {
                  currentUserResource: 'CurrentUser',
                  currentUser: ['currentUserResource', function(currentUserResource) {
                    return currentUserResource;
                  }]
                }
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
    .run(['$rootScope', function($rootScope) {

      // Check if url includes #/ https://gist.github.com/aurbano/59a7ed66078d95fcaa9f
      if (window.location.hash.length < 1 || window.location.hash === '') {
        console.log("Added hashbang");
        window.location = window.location.origin + window.location.pathname + '#/' + window.location.search;
      }

      $rootScope.$on('event:auth-loginRequired', function(event, data) {
        console.log("Login required");
      });

      $rootScope.$on('event:auth-loginConfirmed', function(event, data) {
        console.log("Login done");
      });
    }]);

  angular.element().ready(function() {
    console.info("Strider Web initialized");
    angular.bootstrap(document, ['strider']);
  });

  return app;
});
