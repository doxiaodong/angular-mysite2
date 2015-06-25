'use strict';

angular.module('angularMysite2')
  .controller('ArticleDetailCtrl', function($scope, $stateParams) {
    $scope.article = {
      articleDetailTitle: '早上好！',
      category: {
        key: 'poyi',
        name: '爱婆姨'
      },
      createTime: '2015-06-12',
      content: '今天天气好晴蓝，啦啦啦啦啦'
    };

    $scope.articleReplies = 20;

    $scope.reply = function() {
      console.log("reply");
    };
    $scope.comment = function() {
      console.log("comment");
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

    $scope.replies = [{
      replyUser: {
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
        nickName: '毒枭东'
      },
      content: '哇！发现新大陆了',
      time: '2015-12-31',
      index: 1,
      subReplies: [{
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }]
    }, {
      replyUser: {
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
        nickName: '毒枭东'
      },
      content: '哇！发现新大陆了',
      time: '2015-12-31',
      index: 2,
      subReplies: [{
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }, {
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }]
    }];

  });
