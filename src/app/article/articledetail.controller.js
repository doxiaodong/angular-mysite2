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

    $scope.submitForm = {
      replyContent: '',
      commentContent: ''
    };

    $scope.articleReplies = 0;

    $scope.replySubmit = function(object, content) {
      console.log("1.type: reply", "2.object: " + object, "3.content: " + content);
    };
    $scope.commentSubmit = function(content) {
      console.log("1.type: comment", "2.content: " + content);
    };

    $scope.showReplyInput = function(reply, subReply) {
      reply.input.object = subReply.replyUser.username;
      reply.input.nickName = subReply.replyUser.nickName;
      angular.forEach($scope.replies, function(self) {
        self.input.show = false;
      });
      reply.input.show = true;
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
        nickName: '毒枭东',
        username: 'duxiaodong'
      },
      input: {
        show: false
      },
      content: '哇！发现新大陆了',
      time: '2015-12-31',
      index: 1,
      subReplies: [{
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东',
          username: 'duxiaodong'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东',
          username: 'duxiaodong'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }]
    }, {
      replyUser: {
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
        nickName: '毒枭东',
        username: 'duxiaodong'
      },
      input: {
        show: false
      },
      content: '哇！发现新大陆了',
      time: '2015-12-31',
      index: 2,
      subReplies: [{
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '杜小东',
          username: 'dxd'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东',
          username: 'duxiaodong'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }, {
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '简小小',
          username: 'jxx'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东',
          username: 'duxiaodong'
        },
        content: 'haha！发现新大陆了',
        time: '2015-12-10'
      }]
    }, {
      replyUser: {
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
        nickName: '侯耀斌',
        username: 'hyb'
      },
      input: {
        show: false
      },
      content: '哇！wawawawawa',
      time: '2015-12-31',
      index: 3,
      subReplies: [{
        replyUser: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '毒枭东',
          username: 'duxiaodong'
        },
        replyObject: {
          pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
          nickName: '侯耀斌',
          username: 'hyb'
        },
        content: 'haha！太蠢了',
        time: '2015-11-10'
      }]
    }];

    // count articleReplies
    angular.forEach($scope.replies, function(self) {
      $scope.articleReplies += 1 + self.subReplies.length;
    });

  });
