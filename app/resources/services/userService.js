define(['angular'], function(angular) {
  "use strict";

  angular.module('UserService', [])
    .factory('CurrentUser', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'users/current').get();
      }
    ]);
});
