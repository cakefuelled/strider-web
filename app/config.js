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
      deps: ['angular']
    },
    'angular-bootstrap': {
      deps: [
        'angular'
      ]
    },
    bootstrap: {
      deps: [
        'jquery'
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
    'ui-router': '../bower_components/ui-router/release/angular-ui-router'
  },
  packages: [

  ]
});

require([
  'angular',
  'app'
], function(angular, app) {

  console.info("Strider Web initialized");

  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    // bootstrap the app manually
    angular.bootstrap(document, ['strider']);
  });

});
