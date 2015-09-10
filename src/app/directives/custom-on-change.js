'use strict';

angular.module('app')
  .directive('customOnChange', function() {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element, attr) {
        var onChangeHandler = scope.$eval(attr.customOnChange);
        //console.log(scope, element)
        element.bind('change', onChangeHandler);
      }
    };
  });
