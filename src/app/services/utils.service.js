'use strict';

angular.module('angularMysite2')
  .factory('utils', function() {
    return {
      usernamePattern: /^\w{6,20}$/,
      passwordPattern: /^\w{6,20}$/,
      param: function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }

        return str.join("&");
      }
    };
  })
;
