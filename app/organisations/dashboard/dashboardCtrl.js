define(['angular', 'md5'], function(angular, md5) {
  'use strict';

  angular.module('DashboardCtrls', [])
    .controller('DashboardCtrl', ['$scope', 'User', 'store', '$http', 'Org', '$state',
      function($scope, User, store, $http, Org, $state) {
        console.log("Dashboard Controller");

        $scope.Org = Org;

        $scope.scanner = {
          ready: false,
          text: ''
        };

        $scope.$watch('scanner.text', function(val) {
          var original = val,
            protocol = 'http://',
            orgUrl = 'inventory.aimarfoundation.org',
            divider = '/';

          if(val.length < 1){
            return;
          }
          // Reset the field
          $scope.scanner.text = '';

          console.log('Scanned ',val);

          // Try to figure out what to do with the code
          // Remove protocol, if set
          if(val.substr(0,protocol.length) === protocol){
            val = val.substr(protocol.length);
          }

          // Remove org url, if any
          if(val.substr(0,orgUrl.length) === orgUrl){
            val = val.substr(orgUrl.length);
          }

          // Remove possible trailing /
          if(val[0] === '/'){
            val = val.substr(1);
          }

          // Now divide in parts
          var parts = val.split(divider);
          if(parts.length === 0){
            // Just one part
            return broadcastScan(parts[0]);
          }

          if($state.includes('edit')){
            // We are already in an editing page
            // so just broadcast the scan
            return broadcastScan(parts);
          }

          // Finally, check if the type is
          // one of our routes
          var sections = ['item','category','location','user'];

          if(sections.indexOf(parts[0]) > -1){
            var stateName = parts[0]+'s';
            if(parts[0] === 'category'){
              stateName = 'categories';
            }
            // Yes, so navigate there
            $state.go('orgs.dashboard.'+stateName+'.edit', {id: parts[1]});
            return;
          }

          // Finally, no idea what this was, so just broadcast the whole thing
          return broadcastScan(original);
        });

        function broadcastScan(data){
          console.log('EMIT: ',data);
          $scope.$emit('scan',data);
        }

        function getCurrentUser() {
          $scope.user = User.get({
            id: 'me'
          }, function(data) {
            data.md5 = md5(data.email);
            return data;
          }, function(err) {
            console.log(err);
            if (err.status === 404) {
              // User not logged in
              $scope.$broadcast('event:auth-loginRequired', {});
            }
          });
        }

        $scope.logout = function() {
          User.logout().$promise.then(function() {
            console.log('Logged out');
            store.remove('accessToken');
            delete $http.defaults.headers.common.Authorization;
            getCurrentUser();
          });
        };
      }
    ]);
});
