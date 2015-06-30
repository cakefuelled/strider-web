define(['angular'], function(angular) {
  "use strict";

  angular.module('services.categories', [])
    .service('Categories', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:org/categories/:id');
      }
    ]);
});
