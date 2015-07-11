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
        url: HOST_URL + '/article/categories/',
        headers: header
        //data: utils.param({
        //  'csrfmiddlewaretoken': $cookies.csrftoken
        //})
      }).success(function(data) {
        // data.data.isOldUser
      })
      ;
    };

    this.getArticleList = function(category, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/article/articles/' + category + '/',
        headers: header
      })
      ;
    };

    this.getArticleDetail = function(url, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/article/' + url + '/',
        headers: header
      })
      ;
    };

    this.getComments = function(article, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/comment/comments/' + article + '/',
        headers: header
      })
      ;
    };

    this.getSubComments = function(head, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/comment/subcomments/' + head + '/',
        headers: header
      })
      ;
    };
  });
