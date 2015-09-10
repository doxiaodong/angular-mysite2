'use strict';

angular.module('app')
  .directive('xdPlatform', function($window, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var ua = $window.navigator.userAgent;
        scope.mobile = ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && ua.match(/Mobile/i) !== null;
        scope.standalone = $window.navigator.standalone;
        $rootScope.platform = {
          mobile: scope.mobile,
          standalone: scope.standalone
        };
      }
    };
  });
