define(['angular'], function(angular) {
  "use strict";

  angular.module('strider.gravatar', []).
  directive('gravatar', function() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        name: '@',
        height: '@',
        width: '@',
        emailHash: '@'
      },
      link: function(scope) {
        scope.defaultImage = 'retro';
      },
      template: '<img alt="{{ name }}" height="{{ height }}"  width="{{ width }}" src="https://secure.gravatar.com/avatar/{{ emailHash }}.jpg?s={{ width }}&d={{ defaultImage }}">'
    };
  });
});
