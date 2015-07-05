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
    console.log($scope.articleList.category);

    ArticleApi.getArticleList($scope.articleList.category)
      .success(function(data) {
      console.log(data);
    })
    ;

    $scope.articles = [{
      title: '春天秋天',
      createTime: '2015-06-24',
      category: 'front',
      id: 1
    }, {
      title: '夏天秋天',
      createTime: '2015-06-25',
      category: 'poyi',
      id: 2
    }, {
      title: '秋天秋天',
      createTime: '2015-06-26',
      category: 'poyi',
      id: 3
    }, {
      title: '冬天秋天',
      createTime: '2015-06-27',
      category: 'poyi',
      id: 4
    }, {
      title: '天秋天',
      createTime: '2015-07-26',
      category: 'front',
      id: 5
    }, {
      title: '冬秋天',
      createTime: '2015-08-27',
      category: 'front',
      id: 6
    }];
	})
;
