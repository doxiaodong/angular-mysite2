'use strict';

angular.module('app')
  .directive('xdTitle', function(setTitle, $rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var time = $rootScope.isFirst ? 500 : 20;
        scope.$on('title.get', function(e, title) {
          setTitle.brocastTitle(title);
        });
        $timeout(function() {
          setTitle.brocastTitle(attr.xdTitle);
        }, time);
        $rootScope.$on('languageChange', function() {
          setTitle.brocastTitle(attr.xdTitle);
        });
      }
    };
  });
