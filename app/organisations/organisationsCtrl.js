define(['angular'], function(angular) {
  'use strict';
  
  angular.module('OrganisationCtrls', [])
    .controller('OrganisationCtrl', ['$scope', '$http', 'apiUrl', 'UserOrgs',
      function($scope, $http, apiUrl, UserOrgs) {
        console.log('Organisation ctrl');

        $scope.organisations = UserOrgs.query({
          id: 'me'
        });

        $scope.organisations.$promise.then(function(){}, function(err){
          console.log(err);
          if(err.status === 404){
            console.log('broadcasting event');
            // User not logged in
            $scope.$emit('event:auth-loginRequired',{});
          }
        });
      }
    ]);
});