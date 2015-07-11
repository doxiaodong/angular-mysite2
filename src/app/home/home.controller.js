'use strict';

angular.module('angularMysite2')
	.controller('HomeCtrl', function($scope, ArticleApi) {
    ArticleApi.getArticleList('hot')
      .success(function(data) {
        $scope.articles = [];
        angular.forEach(data.results, function(self) {
          var article = {
            url: self.url,
            title: self.title,
            createTime: self.create_time,
            category: self.category.url
          };
          $scope.articles.push(article);
        });
      })
    ;
	})
;
