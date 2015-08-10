'use strict';

angular.module('app')
  .factory('utils', function($cookies) {
    return {
      usernamePattern: /^\w{6,20}$/,
      passwordPattern: /^\w{6,20}$/,
      param: function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }

        return str.join("&");
      },
      getHeader: function() {
        return {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': $cookies.csrftoken
        };
      },
      itsMe: function(a, b) {
        return a === b;
      }
    };
  })
;
