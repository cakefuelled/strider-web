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
    'angular-ladda': {
      deps: [
        'angular',
        'ladda'
      ]
    },
    'bootstrap-sass': {
      deps: [
        'jquery'
      ]
    },
    'angular-resource': {
      deps: [
        'angular'
      ]
    },
    'angular-storage': {
      deps: [
        'angular'
      ]
    },
    'qrcodejs': {
      exports: 'QRCode'
    }
  },
  paths: {
    app: 'app',
    requirejs: '../bower_components/requirejs/require',
    angular: '../bower_components/angular/angular',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
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
    'angular-http-auth': '../bower_components/angular-http-auth/src/http-auth-interceptor',
    md5: '../bower_components/blueimp-md5/js/md5',
    ladda: '../bower_components/ladda/dist/ladda.min',
    spin: '../bower_components/spin.js/spin',
    'angular-ladda': '../bower_components/angular-ladda/dist/angular-ladda.min',
    'blueimp-md5': '../bower_components/blueimp-md5/js/md5',
    'angular-storage': '../bower_components/a0-angular-storage/dist/angular-storage',
    'a0-angular-storage': '../bower_components/a0-angular-storage/dist/angular-storage',
    'bootstrap-sass': '../bower_components/bootstrap-sass/assets/javascripts/bootstrap',
    'qrcodejs': '../app/resources/js-non-bower/qrcode'
  },
  packages: [

  ],
  deps: [
    'app'
  ]
});
