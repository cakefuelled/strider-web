/**
 * Strider
 * Requirejs configuration file
 * You shouldn't touch this file directly, instead run grunt
 * @type requirejs configuration
 */
requirejs.config({
  shim: {
    bootstrap: {
      deps: [
        'jquery'
      ]
    }
  },
  paths: {
    requirejs: '../bower_components/requirejs/require',
    angular: '../bower_components/angular/angular',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
  },
  packages: [

  ]
});
