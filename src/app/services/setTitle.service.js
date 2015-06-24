'use strict';

angular.module('angularMysite2')
  .service('setTitle', function($rootScope) {
    this.brocastTitle = function(title) {
      $rootScope.$broadcast('titleChange', title);
    };
  })
;
