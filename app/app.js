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
  'organisations/dashboard/landing/landingCtrl',
  'organisations/dashboard/dashboardCtrl',
  // Dashboard -> Items
  'organisations/dashboard/items/itemsCtrl',
  'organisations/dashboard/items/itemsService',
  'organisations/dashboard/items/new/newItemCtrl',
  'organisations/dashboard/items/scan/scanCtrl',
  // Dashboard -> Users
  'organisations/dashboard/users/usersService',
  'organisations/dashboard/users/userCtrl',
  // Dashboard -> Locations
  'organisations/dashboard/locations/locationsCtrl',
  'organisations/dashboard/locations/locationsService',
  // Dashboard -> Categories
  'organisations/dashboard/categories/categoriesCtrl',
  'organisations/dashboard/categories/categoriesService',
  'organisations/dashboard/categories/new/newCategoryCtrl',
  'organisations/dashboard/categories/edit/editCategoryCtrl',
  // Signup
  'sign-up/signUpCtrl',
  // Resources
  'resources/services/userService',
  'resources/directives/loginHandler',
  'resources/directives/gravatar'

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
    'LocationCtrls',
    'CategoriesCtrls',
    'UsersCtrls',

    'SignUpCtrls',

    'services.users',
    'services.items',
    'services.locations',
    'services.categories',
    'services.orgUsers',
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
          .state('orgs.dashboard.items.scan', {
            url: '/scan',
            data: {
              displayName: 'Scan Item'
            },
            views: {
              'content@orgs.dashboard': {
                templateUrl: 'app/organisations/dashboard/items/scan/scan.html',
                controller: 'ScanCtrl'
              }
            }
          })
          .state('orgs.dashboard.locations', {
            url: '/locations',
            data: {
              displayName: 'Locations'
            },
            views: {
              'content': {
                templateUrl: 'app/organisations/dashboard/locations/locations.html',
                controller: 'LocationCtrl'
              }
            }
          })
          .state('orgs.dashboard.users', {
            url: '/users',
            data: {
              displayName: 'Users'
            },
            views: {
              'content': {
                templateUrl: 'app/organisations/dashboard/users/users.html',
                controller: 'UsersCtrl'
              }
            }
          })
          .state('orgs.dashboard.categories', {
            url: '/categories',
            data: {
              displayName: 'Categories'
            },
            views: {
              'content': {
                templateUrl: 'app/organisations/dashboard/categories/categories.html',
                controller: 'CategoryCtrl'
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
          window.location = window.location.origin + window.location.pathname + '#/' + window.location.search;
        }

        // Keep the body height
        function resize(){
          $('#main').height($(window).height() - $('nav').height());
        }
        $(window).resize(resize);
        setTimeout(resize, 250);
      }
    ]);

  angular.element().ready(function() {
    console.info("Strider Web initialized");
    angular.bootstrap(document, ['strider']);
  });

  return app;
});
