define(['angular'], function(angular) {
  "use strict";

  angular.module('services')
    .factory('Category', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
      return $resource(apiUrl + 'organisations/:orgId/categories/:id', null, 
        {
          'update': { method: 'PUT' }
        });
      }
    ]);
});
