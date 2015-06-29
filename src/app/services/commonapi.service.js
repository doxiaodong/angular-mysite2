'use strict';

angular.module('angularMysite2')
  .service('CommonApi', function($http, $cookies, utils, HOST_URL) {
    var header = {'Content-Type': 'application/x-www-form-urlencoded'};

    this.initHomePage = function() {
      return $http({
        method: 'GET',
        url: HOST_URL + '/api/initHomePage/',
        headers: header
      }).success(function(data, status, headers) {
        //$cookies.csrftoken = data.data.csrftoken
      })
    }
  });
