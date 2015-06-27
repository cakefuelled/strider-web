/**
 * Strider - Inventory Management
 * @link https://github.com/cakefuelled/strider-web
 * @license GNU Aferro GPL v3.0 License, https://github.com/cakefuelled/strider-web/blob/master/LICENSE
 */

define([
  // Package deps
  'angular',
  'ui-router',
  'angular-ladda',
  'angular-storage',
  'angular-resource',
  'angular-bootstrap',
  'angular-loading-bar',
  'angular-http-auth',
  'angular-auth-interceptor',
  'angular-utils-ui-breadcrumbs',
  // App deps
  'constants',
  // Dashboard
  'organisations/organisationsCtrl',
  'organisations/dashboard/items/itemsCtrl',
  'organisations/dashboard/items/itemsService',
  'organisations/dashboard/items/new/newCtrl',
  'organisations/dashboard/landing/landingCtrl',
  'organisations/dashboard/dashboardCtrl',
  // Signup
  'sign-up/signUpCtrl',
  // Resources
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
    'angular-ladda',
    'angular-storage',

    'constants',

    'OrganisationCtrls',
    'DashboardCtrls',
    'ItemsCtrls',
    'LandingCtrls',

    'SignUpCtrls',

    'services.users',
    'services.items',
    'strider.gravatar'
  ]).
  config(['$stateProvider', 'cfpLoadingBarProvider',
      function($stateProvider, cfpLoadingBarProvider) {
        $stateProvider.
        state('orgs', {
            url: '/',
            data: {
              displayName: false
            },
            views: {
              'main': {
                templateUrl: 'app/organisations/organisations.html',
                controller: 'OrganisationCtrl'
              }
            }
          })
          .state('orgs.dashboard', {
            abstract: true,
            url: 'org/:organisation',
            data: {
              displayName: 'Dashboard',
              breadcrumbProxy: 'orgs.dashboard.landing'
            },
            views: {
              'main@': {
                templateUrl: 'app/organisations/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
              }
            },
            resolve: {
              Org: ['$stateParams', 'UserOrgs', '$state', '$q',
                function($stateParams, UserOrgs, $state, $q) {
                  console.log("Resolving org");
                  var orgs = UserOrgs.query(),
                      org = null,
                      deferred = $q.defer();

                  orgs.$promise.then(function(data) {
                    // Resolve the org object
                    var total = data.length;
                    for (var i = 0; i < total; i++) {
                      if (data[i].path === $stateParams.organisation) {
                        org = data[i];
                        break;
                      }
                    }
                    if (org === null) {
                      $state.go('orgs');
                      return;
                    }
                    console.log(org);
                    deferred.resolve(org);
                  });

                  return deferred.promise;
                }
              ]
            }
          })
          .state('orgs.dashboard.landing', {
            url: '/',
            data: {},
            views: {
              'content': {
                templateUrl: 'app/organisations/dashboard/landing/landing.html',
                controller: 'LandingCtrl'
              }
            }
          })
          .state('orgs.dashboard.items', {
            url: '/items',
            data: {
              displayName: 'Items'
            },
            views: {
              'content': {
                templateUrl: 'app/organisations/dashboard/items/items.html',
                controller: 'ItemsCtrl'
              }
            }
          })
          .state('orgs.dashboard.items.new', {
            url: '/new',
            data: {
              displayName: 'New Item'
            },
            views: {
              'content@orgs.dashboard': {
                templateUrl: 'app/organisations/dashboard/items/new/new.html',
                controller: 'NewItemCtrl'
              }
            }
          })
          .state('sign-up', {
            url: '/sign-up',
            data: {},
            views: {
              'main': {
                templateUrl: 'app/sign-up/sign-up.html',
                controller: 'SignUpCtrl'
              }
            }
          });

        cfpLoadingBarProvider.includeBar = true;
      }
    ])
    .run(['$http', 'store',
      function($http, store) {

        $http.defaults.withCredentials = true;

        // Check if machine has accessToken stored
        var accessToken = store.get('accessToken');
        if (typeof(accessToken) !== 'undefined' && accessToken !== null && accessToken.length > 0) {
          // Set it on the http header
          $http.defaults.headers.common.Authorization = accessToken;
        }

        // Check if url includes #/ https://gist.github.com/aurbano/59a7ed66078d95fcaa9f
        if (window.location.hash.length < 1 || window.location.hash === '') {
          console.log("Added hashbang");
          window.location = window.location.origin + window.location.pathname + '#/org' + window.location.search;
        }
      }
    ]);

  angular.element().ready(function() {
    console.info("Strider Web initialized");
    angular.bootstrap(document, ['strider']);
  });

  return app;
});
