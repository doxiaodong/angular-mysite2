'use strict';

angular.module('app')
  .directive('xdLoading', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/xd-loading.html',
      link: function(scope, element, attr) {
        scope.showLoading = false;
        var loadingNum = 0;
        scope.$on('loading.show', function() {
          loadingNum++;
          scope.showLoading = true;
          //console.log(loadingNum, 'show');
        });
        scope.$on('loading.hide', function() {
          loadingNum--;
          if (loadingNum <= 0) {
            loadingNum = 0;
            scope.showLoading = false;
          }
          //console.log(loadingNum, 'hide');
        });
      }
    };
  });
