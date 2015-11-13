'use strict';

angular.module('app')
  .service('CommonApi', function($rootScope, $http, $cookies, utils, HOST_URL, UserService) {
    var header = {'Content-Type': 'application/x-www-form-urlencoded'};

    this.initHomePage = function() {
      return $http({
        method: 'GET',
        url: HOST_URL + '/initHomePage/',
        headers: header
      }).success(function(data, status, headers) {
        if (+data.status === 1) {
          if (data.data.user) {
            UserService.save(data.data.user);
          } else {
            $rootScope.$broadcast('get_no_user_info');
          }
        }

      });
    };
  });
