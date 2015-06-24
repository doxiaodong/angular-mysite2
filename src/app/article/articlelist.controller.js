'use strict';

angular.module('angularMysite2')
	.controller('ArticleListCtrl', function($scope, $stateParams) {
    console.log($stateParams)

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
      createTime: '2015-06-24'
    }, {
      title: '夏天秋天',
      createTime: '2015-06-25'
    }, {
      title: '秋天秋天',
      createTime: '2015-06-26'
    }, {
      title: '冬天秋天',
      createTime: '2015-06-27'
    }, {
      title: '天秋天',
      createTime: '2015-07-26'
    }, {
      title: '冬秋天',
      createTime: '2015-08-27'
    }];
	})
;
