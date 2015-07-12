'use strict';

angular.module('angularMysite2')
  .service('AccountApi', function($http, $cookies, utils, localStorageService, HOST_URL) {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': $cookies.csrftoken
    };

    this.signin = function(obj) {
      console.log($cookies.csrftoken)
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/signin/',
        headers: header,
        data: utils.param({
          'username': obj.username,
          'password': obj.password
        })
      }).success(function(data) {
        if (data.status) {
          localStorageService.add('user', {username: obj.username, password: obj.password});
        }
      })
        ;
    };

  });
