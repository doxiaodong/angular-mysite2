'use strict';

angular.module('darlin')
  .service('setTitle', function($rootScope) {
    this.brocastTitle = function(title) {
      $rootScope.$broadcast('titleChange', title);
    };
  })
;
