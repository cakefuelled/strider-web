define(['angular'], function(angular) {
  "use strict";

  angular.module('services.users', [])
    .service('User', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'Users/:id');
      }
    ]);
});
