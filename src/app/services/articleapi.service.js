'use strict';

angular.module('angularMysite2')
  .service('ArticleApi', function($http, utils, HOST_URL) {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    this.getArticleCategories = function() {
      return $http({
        method: 'POST',
        url: HOST_URL + '/article/getArticleCategory/',
        headers: header
      }).success(function(data) {
        // data.data.isOldUser
      })
    }
  });
