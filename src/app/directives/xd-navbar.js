'use strict';

angular.module('app')
  .directive('xdNavbar', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/components/navbar/navbar.html'
    };
  });
