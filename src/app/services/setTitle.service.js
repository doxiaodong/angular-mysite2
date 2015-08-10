'use strict';

angular.module('app')
  .service('setTitle', function($rootScope) {
    this.brocastTitle = function(title) {
      $rootScope.$broadcast('titleChange', title);
    };
  })
;
