'use strict';

angular.module('app')
	.controller('HomeCtrl', function($scope, ArticleApi, urlSafeBase64Util) {
    $scope.encode = urlSafeBase64Util.encode;
    $scope.pagePrev = '';
    $scope.pageNext = '';
    $scope.prevPage = function() {
      if ($scope.pagePrev) {
        getArticles($scope.pagePrev);
      }
    };
    $scope.nextPage = function() {
      if ($scope.pageNext) {
        getArticles($scope.pageNext);
      }
    };

    getArticles();

    function getArticles(url) {
      ArticleApi.getArticleList('hot', {
        url: url ? url : null
      })
        .success(function(data) {
          if (data.previous) {
            $scope.pagePrev = data.previous;
          } else {
            $scope.pagePrev = '';
          }
          if (data.next) {
            $scope.pageNext = data.next;
          } else {
            $scope.pageNext = '';
          }

          $scope.articles = [];
          angular.forEach(data.results, function(self) {
            var article = {
              url: self.url,
              title: self.title,
              createTime: self.create_time,
              category: self.category.url,
              isUp: self.is_up,
              isHot: self.hot
            };
            $scope.articles.push(article);
          });
        })
      ;
    }

	})
;
