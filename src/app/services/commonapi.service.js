'use strict';

angular.module('angularMysite2')
  .service('CommonApi', function($http, $cookies, utils, HOST_URL) {
    var header = {'Content-Type': 'application/x-www-form-urlencoded'};

    this.initHomePage = function() {
      return $http({
        method: 'GET',
        url: HOST_URL + '/initHomePage/',
        headers: header
      }).success(function(data, status, headers) {
        // data.data.isOldUser
        if (+data.status === 1) {
          $cookies.csrftoken = data.data.csrftoken;
          window.csrf = data.data.csrftoken;
        }
      })
    }
  });
