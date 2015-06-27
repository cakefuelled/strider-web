define(['angular'], function(angular) {
  "use strict";

  angular.module('services.locations', [])
    .service('Locations', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:org/locations/:id');
      }
    ]);
});
