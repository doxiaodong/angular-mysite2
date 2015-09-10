'use strict';

angular.module('app')
  .directive('xdFooter', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/components/footer/footer.html'
    };
  });
