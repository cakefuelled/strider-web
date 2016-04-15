define(['angular'], function(angular) {
  "use strict";

  angular.module('services')
    .service('Page', ['$rootScope',
      function($rootScope) {
        var page = {};

        $rootScope.mainClasses = ['backdrop', 'backdrop-bus'];

        page.blur = function(){
          page.addClass('blur');
        };

        page.unblur = function(){
          page.removeClass('blur');
        };

        page.addClass = function(name){
          page.removeClass(name);
          $rootScope.mainClasses.push(name);
        };

        page.removeClass = function(name){
          var index = $rootScope.mainClasses.indexOf(name);
          if(index < 0){
            return;
          }
          $rootScope.mainClasses.splice(index, 1);
        };

        return page;
      }
    ]);
});
