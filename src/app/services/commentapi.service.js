'use strict';

angular.module('darlin')
  .service('CommentApi', function($http, $cookies, utils, HOST_URL) {

    this.addArticleReply = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/comments/add/' + obj.article + '/',
        headers: utils.getHeader(),
        data: utils.param({
          'content': obj.content
        })
      }).success(function(data) {
      });
    };

    this.addSubReply = function(obj) {
      return $http({
        method: 'POST',
        url: HOST_URL + '/comments/add-sub/' + obj.comment + '/',
        headers: utils.getHeader(),
        data: utils.param({
          'content': obj.content,
          'reply_object': obj.reply_object
        })
      }).success(function(data) {
      });
    };

  });
