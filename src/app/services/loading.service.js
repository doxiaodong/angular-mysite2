'use strict';

angular.module('app')
  .service('xdLoading', function($rootScope, $timeout) {
    var timeout = null;
    this.show = function() {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      $rootScope.$broadcast('loading.show');
    };
    this.hide = function() {
      $timeout(function() {
        $rootScope.$broadcast('loading.hide');
      }, 500);
    };
  })
;
