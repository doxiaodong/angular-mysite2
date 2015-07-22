'use strict';

angular.module('angularMysite2')
  .service('AccountApi', function($rootScope, $http, $cookies, utils, localStorageService, HOST_URL) {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': $cookies.csrftoken
    };

    this.signin = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/signin/',
        headers: header,
        data: utils.param({
          'username': obj.username,
          'password': obj.password
        })
      }).success(function(data) {
        if (+data.status === 1) {
          $rootScope.user = data.data.user;
          $rootScope.$broadcast('get_user_info', data.data.user);
          localStorageService.add('user', {username: obj.username, password: obj.password});
        }
      })
        ;
    };

    this.register = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/register/',
        headers: header,
        data: utils.param({
          'username': obj.username,
          'password': obj.password,
          'nickname': obj.nickname,
          'email': obj.email
        })
      }).success(function(data) {
        if (+data.status === 1) {
          $rootScope.user = data.data.user;
          $rootScope.$broadcast('get_user_info', data.data.user);
          localStorageService.add('user', {username: obj.username, password: obj.password});
        }
      });
    };

    this.signout = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/signout/',
        headers: header
      }).success(function(data) {
        if (+data.status === 1) {
          $rootScope.user = '';
          $rootScope.$broadcast('account.signout');
        }
      })
        ;
    };

  });
