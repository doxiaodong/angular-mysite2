'use strict';

angular.module('app')
  .factory('HttpInterceptor', function($q, $translate, xdLoading, xdAlert, DEFAULT_LANGUAGE) {
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
        var language = $translate.storage().get() || DEFAULT_LANGUAGE;
        var errorText = '';
        if (language === 'en_US') {
          errorText = 'request error';
        } else {
          errorText = '请求出错';
        }
        xdLoading.hide();
        var text = rejection.statusText || errorText;
        xdAlert.show(text);
        return rejection;
      }
    };
    return interceptor;
  });
