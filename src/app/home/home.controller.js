'use strict';

angular.module('angularMysite2')
	.controller('HomeCtrl', function($scope) {
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
    }];
	})
;
