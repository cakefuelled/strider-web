define(['angular'], function(angular) {
  angular.module('userService', [])
    .factory('currentUser', ['$resource', 'apiUrl',
      function($resource, apiUrl) {
        console.log('current user');
        
        return $resource(apiUrl + 'users/current');

        //return status.get().$promise;
      }
    ]);
});
