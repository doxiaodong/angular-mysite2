'use strict';

angular.module('app')
  .directive('autoFocus', function($timeout) {
    return {
      restrict: 'AE',
      link: function(scope, element, attr) {
        return scope.$watch(attr.autoFocus, function(value) {
          if (value) {
            return $timeout(function() {
              return element[0].focus();
            });
          }
        });
      }
    };
  });
