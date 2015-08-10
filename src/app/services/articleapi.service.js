'use strict';

angular.module('darlin')
  .service('ArticleApi', function($http, $cookies, utils, HOST_URL) {

    this.getArticleCategories = function(obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/article/categories/',
        headers: utils.getHeader()
        //data: utils.param({
        //  'csrfmiddlewaretoken': $cookies.csrftoken
        //})
      }).success(function(data) {
        // data.data.isOldUser
      })
      ;
    };

    this.getArticleList = function(category, obj) {
      var url = obj.url ? obj.url : HOST_URL + '/article/articles/' + category + '/';
      return $http({
        method: 'GET',
        url: url,
        headers: utils.getHeader()
      })
      ;
    };

    this.getArticleDetail = function(url, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/article/' + url + '/',
        headers: utils.getHeader()
      })
      ;
    };

    this.getComments = function(article, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/comment/comments/' + article + '/',
        headers: utils.getHeader()
      })
      ;
    };

    this.getSubComments = function(head, obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/comment/subcomments/' + head + '/',
        headers: utils.getHeader()
      })
      ;
    };

    this.getAllComments = function(obj) {
      return $http({
        method: 'GET',
        url: HOST_URL + '/comments/',
        headers: utils.getHeader()
      })
        ;
    };
  });
