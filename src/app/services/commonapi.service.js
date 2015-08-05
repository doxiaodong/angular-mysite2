'use strict';

angular.module('angularMysite2')
  .service('CommonApi', function($window, $rootScope, $http, $cookies, utils, HOST_URL) {
    var header = {'Content-Type': 'application/x-www-form-urlencoded'};

    this.initHomePage = function() {
      return $http({
        method: 'GET',
        url: HOST_URL + '/initHomePage/',
        headers: header
      }).success(function(data, status, headers) {
        if (+data.status === 1) {
          if (data.data.user) {
            $window.user = data.data.user;
            //console.log($window.user, 1)
            $rootScope.$broadcast('get_user_info', data.data.user);
          }
        }

      })
    }
  });
