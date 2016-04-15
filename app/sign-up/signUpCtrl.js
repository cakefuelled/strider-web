define(['angular','md5'], function(angular, md5) {
  'use strict';
  
  angular.module('controllers')
    .controller('SignUpCtrl', ['$scope', 'User',
      function($scope, User) {
        console.log("Sign Up Controller");
        
        // Hide login box
        $scope.$emit('event:auth-loginConfirmed');
        $scope.$broadcast('changeMainClass', {
          action: 'add',
          name: 'backdrop-bus'
        });

        $scope.user = {
          email: '',
          password: ''
        };

        $scope.errorMsg = '';

        $scope.signUp = {
          btn: 'Register',
          loading: false,

          send: function(){
            $scope.signUp.loading = true;
            $scope.signUp.btn = 'Registering...';
            console.log("Registering user", $scope.user);

            var newUser = new User($scope.user);

            var savePromise = newUser.$save();

            savePromise.then(function(){
              console.log("Registered");
              $scope.signUp.loading = false;
              $scope.signUp.btn = 'Register';
            }, function(err){
              console.log("Failed", err);
              $scope.signUp.loading = false;
              $scope.signUp.btn = 'Register';
              $scope.errorMsg = err.data.error.message;
            });
          }
        };
      }
    ]);
});