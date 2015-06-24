'use strict';

angular.module('angularMysite2')
	.controller('HomeCtrl', function($scope) {
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
    }];
	})
;
