'use strict';

angular.module('app')
  .service('xdLoading', function($rootScope) {
    this.show = function() {
      $rootScope.$broadcast('loading.show');
    };
    this.hide = function() {
      $rootScope.$broadcast('loading.hide');
    };
  })
;
