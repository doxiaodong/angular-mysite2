'use strict';

angular.module('app')
  .service('AccountApi', function($http, $cookies, md5, utils, localStorageService, HOST_URL, UserService) {

    this.signin = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/signin/',
        headers: utils.getHeader(),
        data: utils.param({
          'username': obj.username,
          'password': md5.createHash(obj.password)
        })
      }).success(function(data) {
        if (+data.status === 1) {
          UserService.save(data.data.user);
          //$rootScope.$broadcast('get_user_info', data.data.user);
          localStorageService.add('user', {username: obj.username, password: obj.password});
        }
      });
    };

    this.register = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/register/',
        headers: utils.getHeader(),
        data: utils.param({
          'username': obj.username,
          'password': md5.createHash(obj.password),
          'nickname': obj.nickname,
          'email': obj.email
        })
      }).success(function(data) {
        if (+data.status === 1) {
          UserService.save(data.data.user);
          //$rootScope.$broadcast('get_user_info', data.data.user);
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
          UserService.save('');
          //$rootScope.$broadcast('account.signout');
        }
      });
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
      });
    };

    this.getAccountSubComments = function(obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/account/subcomments/' + obj.user + '/',
        headers: utils.getHeader()
      });
    };

    this.changeProfile = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/setting/',
        headers: {
          'Content-Type': undefined,
          'X-CSRFToken': $cookies.csrftoken
        },
        data: obj.data
      });
    };

    this.changePassword = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/change/',
        headers: utils.getHeader(),
        data: utils.param({
          username: obj.username,
          'old_password': md5.createHash(obj.oldPassword),
          'new_password': md5.createHash(obj.newPassword)
        })
      });
    };

    this.resetPassword = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/account/reset/',
        headers: utils.getHeader(),
        data: utils.param({
          username: obj.username,
          'new_password': md5.createHash(obj.newPassword)
        })
      });
    };

  });
