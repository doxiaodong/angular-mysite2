'use strict';

angular.module('angularMysite2')
	.controller('ArticleListCtrl', function($scope, $window, $stateParams, ArticleApi) {
    var categories = JSON.parse($window.sessionStorage.getItem('categories'));
    if (!categories) {
      ArticleApi.getArticleCategories()
        .success(function(data) {
          $scope.categories = [];
          $scope.categories.push({
            key: 'all',
            name: '全部'
          });
          angular.forEach(data.results, function(self) {
            var category = {
              key: self.url,
              name: self.name
            };
            $scope.categories.push(category);
          });
          $window.sessionStorage.setItem('categories', JSON.stringify($scope.categories));
        })
      ;
    } else {
      $scope.categories = categories;
    }

    $scope.articleList = {
      category: $stateParams.category
    };

    ArticleApi.getArticleList($scope.articleList.category)
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
