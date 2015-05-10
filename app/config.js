/**
 * Strider
 * Requirejs configuration file
 * You shouldn't touch the paths part of this file, instead run grunt
 * @type requirejs configuration
 */
requirejs.config({
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': [
      'angular'
    ],
    'ui-router': {
      deps: [
        'angular'
      ]
    },
    'angular-bootstrap': {
      deps: [
        'angular'
      ]
    },
    'angular-utils-ui-breadcrumbs': {
      deps: [
        'angular'
      ]
    },
    'angular-auth-interceptor': {
      deps: [
        'angular'
      ]
    },
    'angular-http-auth': {
      deps: [
        'angular'
      ]
    },
    'angular-loading-bar': {
      deps: [
        'angular'
      ]
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    'angular-resource': {
      deps: [
        'angular'
      ]
    }
  },
  paths: {
    app: 'app',
    requirejs: '../bower_components/requirejs/require',
    angular: '../bower_components/angular/angular',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    'angular-loader': '../bower_components/angular-loader/angular-loader',
    'angular-route': '../bower_components/angular-route/angular-route',
    almond: '../bower_components/almond/almond',
    'ui-router': '../bower_components/ui-router/release/angular-ui-router',
    sweetalert: '../bower_components/sweetalert/lib/sweet-alert',
    'angular-utils-ui-breadcrumbs': '../bower_components/angular-utils-ui-breadcrumbs/uiBreadcrumbs',
    'angular-auth-interceptor': '../bower_components/angular-auth-interceptor/authHandler',
    'angular-loading-bar': '../bower_components/angular-loading-bar/build/loading-bar',
    jquery: '../bower_components/jquery/dist/jquery',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-http-auth': '../bower_components/angular-http-auth/src/http-auth-interceptor'
  },
  packages: [

  ],
  deps: [
    'app'
  ]
});
