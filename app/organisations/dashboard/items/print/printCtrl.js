define(['angular'], function(angular) {
  'use strict';

  angular.module('PrintCtrls', [])
    .controller('PrintCtrl', ['$scope', '$http', 'apiUrl', 'Items', '$stateParams', 'Organisations', '$timeout',
      function($scope, $http, apiUrl, Items, $stateParams, Organisations, $timeout) {
        console.log("Print controller");

        $scope.Org = Organisations.findOne({
          where: '[where][path]=' + $stateParams.organisation
        });

        var barcodeSettings = {
          width: 1,
          height: 35,
          quite: 10,
          format: "CODE128",
          displayValue: true,
          font: "monospace",
          textAlign: "center",
          fontSize: 12
        };

        $scope.printPage = 0;

        $scope.items = [];

        $scope.reloadItems = function(increase){
          $scope.printPage += increase;
          $scope.printPage = Math.max(0, $scope.printPage);
          $scope.items = Items.query({
            orgId: $scope.Org.id,
            'filter[limit]': 21,
            'filter[skip]': 21 * $scope.printPage
          });

          $scope.items.$promise.then(function(items) {
            $timeout(function() {
              var count = 21 * $scope.printPage + 1;
              items.forEach(function(item) {
                new QRCode('qr-item' + item.id, {
                  width: 100,
                  height: 100,
                  text: 'http://inventory.aimarfoundation.org/item/' + item.id
                });
                $('#barcode-item' + item.id).JsBarcode(pad(count,6), barcodeSettings);
                count++;
              });
            }, 100);
          });
        };

        $scope.Org.$promise.then(function(data) {
          $scope.reloadItems(0);
        });

        function pad(n, width, z) {
          z = z || '0';
          n = n + '';
          return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
      }
    ]);
});
