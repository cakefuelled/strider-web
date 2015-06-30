define(['angular'], function(angular) {
  'use strict';
  
  angular.module('ItemsCtrls')
    .controller('ScanCtrl', ['$scope', '$http', 'apiUrl', 'Items',
      function($scope, $http, apiUrl, Items) {
        console.log("Scan controller");

        $scope.scan = {
          focused: false,
          code: '',
          id: '',
          type: '',
          loading: false
        };

        $scope.$watch('scan.code', function(val){
          var protocol = 'striderÑ--',
              divider = '-';

          if(typeof(val) === 'undefined' || val.length < protocol.length){
            return;
          }

          $scope.scan.loading = true;

          var parts = val.substr(protocol.length).split(divider);

          $scope.scan.type = parts[0];
          $scope.scan.id = parts[1];

          $scope.scan.code = '';

          $scope.scan.loading = false;
        });
      }
    ]);
});