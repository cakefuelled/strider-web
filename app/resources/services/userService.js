define(['angular'], function(angular) {
  "use strict";

  angular.module('services')
    .service('User', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'users/:id', {id: 'me'}, {
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
          },
          update: {
            method: 'PUT'
          }
        });
      }
    ])
    .service('UserOrgs', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'users/:id/organisations/:orgId', {id: 'me'},{
          findOne: {
            method: 'GET'
          }
        });
      }
    ]);
});
