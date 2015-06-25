'use strict';

angular.module('angularMysite2')
	.controller('ArticleListCtrl', function($scope, $stateParams) {

    $scope.articleList = {
      category: $stateParams.category
    };

    $scope.categories = [{
      key: 'all',
      name: '全部'
    }, {
      key: 'front',
      name: '前端'
    }, {
      key: 'poyi',
      name: '爱婆姨'
    }];

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
