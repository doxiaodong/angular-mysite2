'use strict';

angular.module('app')
  .factory('HttpInterceptor', function($q, xdLoading, xdAlert) {
    var interceptor = {
      'request': function (config) {
        xdLoading.show();
        return config;
      },
      'response': function (response) {
        xdLoading.hide();
        return response;
      },
      'requestError': function (rejection) {
        return $q.reject(rejection);
      },
      'responseError': function (rejection) {
        xdLoading.hide();
        var text = rejection.statusText || 'error';
        xdAlert.show(text);
        return rejection;
      }
    };
    return interceptor;
  });
