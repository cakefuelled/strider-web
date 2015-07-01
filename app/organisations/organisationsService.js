define(['angular'], function(angular) {
  "use strict";

  angular.module('services.organisations', [])
    .factory('Organisations', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:orgId', {},{
          findOne: {
            method: 'GET',
            url: apiUrl + 'organisations/findOne'
          }
        });
      }
    ]);
});
