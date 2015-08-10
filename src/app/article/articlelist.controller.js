'use strict';

angular.module('darlin')
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

    getArticles();

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

    function getArticles(url) {
      ArticleApi.getArticleList($scope.articleList.category, {
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
              category: self.category.url
            };
            $scope.articles.push(article);
          });
        })
      ;
    }


	})
;
