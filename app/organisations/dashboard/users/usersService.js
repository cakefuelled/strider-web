define(['angular'], function(angular) {
  "use strict";

  angular.module('services.orgUsers', [])
    .service('OrgUsers', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        return $resource(apiUrl + 'organisations/:org/users/:id');
      }
    ]);
});
