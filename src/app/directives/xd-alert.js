'use strict';

angular.module('app')
  .directive('xdAlert', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/xd-alert.html',
      link: function(scope, element, attr) {
        scope.showAlert = false;
        scope.opts = {};
        scope.$on('alert.show', function(e, opts) {
          scope.opts.title = opts.title === undefined ? attr.alertTitle : opts.title;
          scope.opts.ok = opts.ok === undefined ? attr.alertOk : opts.ok;
          scope.opts.content = opts.content;
          scope.opts.callback = opts.callback;
          scope.showAlert = true;
        });

        scope.closeAlert = function() {
          scope.showAlert = false;
          if (scope.opts.callback) {
            scope.opts.callback();
          }
        };
      }
    };
  });
