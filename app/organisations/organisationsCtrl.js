define(['angular'], function(angular) {
  'use strict';
  
  angular.module('OrganisationCtrls', [])
    .controller('OrganisationCtrl', ['$scope', '$http', 'apiUrl', 'UserOrgs',
      function($scope, $http, apiUrl, UserOrgs) {
        console.log('Organisation ctrl');

        $scope.organisations = UserOrgs.query({
          id: 'me'
        });
      }
    ]);
});