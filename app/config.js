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
    'angular-route': '../bower_components/angular-route/angular-route'
  },
  packages: [

  ]
});

require([
  'angular',
  'app'
], function(angular, app) {

  console.info("Stride Web initialized");

  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    // bootstrap the app manually
    angular.bootstrap(document, ['myApp']);
  });

});
