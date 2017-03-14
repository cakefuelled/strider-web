define(['angular'], function(angular) {
  'use strict';
  
  angular.module('controllers')
    .controller('EditUserCtrl', ['$scope', '$http', 'apiUrl', 'User', 'Org', '$stateParams', '$timeout',
      function($scope, $http, apiUrl, User, Org, $stateParams, $timeout) {
        
        $scope.user = User.get({
          id: $stateParams.id
        });

        $scope.updating = false;

        $timeout(function() {
          $scope.qr = new QRCode('editQr',{
            height: 100,
            width: 100
          });
          $scope.qr.makeCode('http://inventory.aimarfoundation.org/user/'+$scope.user.id);
        }, 1000);

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