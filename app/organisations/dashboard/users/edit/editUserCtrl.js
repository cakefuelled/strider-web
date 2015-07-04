define(['angular'], function(angular) {
  'use strict';
  
  angular.module('UsersCtrls')
    .controller('EditUserCtrl', ['$scope', '$http', 'apiUrl', 'User', 'Org', '$stateParams',
      function($scope, $http, apiUrl, User, Org, $stateParams) {
        
        $scope.user = User.get({
          id: $stateParams.id
        });

        $scope.updating = false;

        $scope.submit = function() {
          $scope.updating = true;

          $scope.user.$update({
            id: $stateParams.id
          }, function() {
            console.log('saved');
            $scope.updating = false;
          }, function(err) {
            alert(err);
            $scope.updating = false;
          });
        };
      }
    ]);
});