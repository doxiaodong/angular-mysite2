'use strict';

angular.module('angularMysite2')
  .factory('utils', function() {
    return {
      usernamePattern: /^\w{6,20}$/,
      passwordPattern: /^\w{6,20}$/
    };
  })
;
