define(['angular'], function(angular) {
  "use strict";

  angular.module('services.items', [])
    .factory('Items', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + ':orgId/items/:id');
      }
    ]);
});
