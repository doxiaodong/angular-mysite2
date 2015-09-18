'use strict';

angular.module('app')
  .directive('xdPlatform', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var ua = $window.navigator.userAgent;

        scope.platform = {
          mobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && ua.match(/Mobile/i) !== null,
          ipad: ua.match(/ipad/i) !== null,
          iphone: ua.match(/iphone/i) !== null,
          android: ua.match(/android/i) !== null,
          webkit: ua.match(/webkit/gi) !== null,
          touch: ('ontouchstart' in $window),

          standalone: $window.navigator.standalone
        };
        scope.platform.ios = scope.platform.ipad || scope.platform.iphone;
        scope.platform.ios7 = scope.platform.ios && ua.match(/os 7/i) !== null;
        scope.platform.ios8 = scope.platform.ios && ua.match(/os 8/i) !== null;
        scope.platform.ios9 = scope.platform.ios && ua.match(/os 9/i) !== null;

        for (var platform in scope.platform) {
          if (scope.platform[platform]) {
            element.addClass(platform);
          }
        }

      }
    };
  });
