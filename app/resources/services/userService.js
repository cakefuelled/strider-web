define(['angular'], function(angular) {
  "use strict";

  angular.module('services.users', [])
    .service('User', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'Users/:id', null, {
          login: {
            method: 'POST',
            url: apiUrl + 'users/login',
            params: {},
            ignoreAuthModule: true
          },
          logout: {
            method: 'POST',
            url: apiUrl + 'users/logout',
            ignoreAuthModule: true
          }
        });
      }
    ]);
});
