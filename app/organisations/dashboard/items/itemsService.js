define(['angular'], function(angular) {
  "use strict";

  angular.module('services.items', [])
    .service('Items', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + ':org/items/:id');
      }
    ]);
});
