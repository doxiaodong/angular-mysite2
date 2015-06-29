'use strict';

angular.module('angularMysite2')
  .service('ArticleApi', function($http, $cookies, utils, HOST_URL) {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded'
      //'X-CSRFToken': $cookies.csrftoken
    };

    this.getArticleCategories = function(obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/api/article/categories/',
        headers: header
        //data: utils.param({
        //  'csrfmiddlewaretoken': $cookies.csrftoken
        //})
      }).success(function(data) {
        // data.data.isOldUser
      })
    }
  });
