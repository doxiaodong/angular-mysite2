'use strict';

angular.module('angularMysite2')
  .service('AccountApi', function($rootScope, $http, $cookies, utils, localStorageService, HOST_URL) {

    this.signin = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/signin/',
        headers: utils.getHeader(),
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
        headers: utils.getHeader(),
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
        headers: utils.getHeader()
      }).success(function(data) {
        if (+data.status === 1) {
          $rootScope.user = '';
          $rootScope.$broadcast('account.signout');
        }
      })
        ;
    };

    this.getUserInfo = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/getUserInfo/',
        headers: utils.getHeader(),
        data: utils.param({
          username: obj.username
        })
      }).success(function(data) {
        if (+data.status === 1) {
        }
      })
        ;
    };

    this.getAccountSubComments = function(obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/account/subcomments/' + obj.user + '/',
        headers: utils.getHeader()
      })
    };

  });
