define(['angular'], function(angular) {
  "use strict";

  angular.module('services.items', [])
    .factory('Item', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:orgId/items/:id');
      }
    ])
    .factory('ItemCategory', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:orgId/items/:itemId/categories/:id');
      }
    ]);
});
