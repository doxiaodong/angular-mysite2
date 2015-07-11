'use strict';

angular.module('angularMysite2')
  .controller('ArticleDetailCtrl', function($scope, $window, $document, $stateParams, ArticleApi) {

    ArticleApi.getArticleDetail($stateParams.url)
      .success(function(data) {
        $scope.article = {
          articleDetailTitle: data.title,
          category: {
            key: data.category.url,
            name: data.category.name
          },
          createTime: data.create_time,
          content: data.content
        };
      })
    ;

    $scope.submitForm = {
      replyContent: '',
      commentContent: ''
    };

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

    ArticleApi.getComments($stateParams.url)
      .success(function(data) {
        $scope.replies = [];
        if (data.results) {
          angular.forEach(data.results, function(self) {
            var reply = {
              replyUser: {
                pic: self.reply_user.pic,
                username: self.reply_user.username,
                nickName: self.reply_user.nickname
              },
              input: {
                show: false
              },
              content: self.content,
              time: self.reply_time,
              index: self.index
            };
            $scope.replies.push(reply);
            ArticleApi.getSubComments(self.url)
              .success(function(subData) {
                if (subData.results) {
                  reply.subReplies = [];
                  angular.forEach(subData.results, function(subSelf) {
                    reply.subReplies.push({
                      replyUser: {
                        pic: subSelf.reply_user.pic,
                        username: subSelf.reply_user.username,
                        nickName: subSelf.reply_user.nickname
                      },
                      replyObject: {
                        pic: subSelf.reply_object.pic,
                        username: subSelf.reply_object.username,
                        nickName: subSelf.reply_object.nickname
                      },
                      content: subSelf.content,
                      time: subSelf.reply_time
                    });
                  });
                }
              })
            ;
          });
        }
      })
    ;

    // count articleReplies
    $scope.articleReplies = 0;
    angular.forEach($scope.replies, function(self) {
      $scope.articleReplies += 1 + self.subReplies.length;
    });

  });
