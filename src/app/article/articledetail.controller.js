'use strict';

angular.module('angularMysite2')
  .controller('ArticleDetailCtrl', function($scope, $rootScope, $window, $document, $stateParams, ArticleApi, CommentApi, HOST_URL, xdAlert) {
    $scope.requesting = false;
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
        $scope.$emit('title.get', data.title);
      })
    ;

    clearSubmitForm();

    $scope.articleReplies = 0;

    $scope.replySubmit = function(object, content, comment, index) {
      $scope.requesting = true;
      CommentApi.addSubReply({
        comment: comment,
        content: content,
        reply_object: object
      }).success(function(data) {
        $scope.requesting = false;
        if (+data.status === 1) {
          //updateComments();
          clearSubmitForm();
          var sub = data.data.subComment;
          sub.replyObject.pic = HOST_URL + '/media/' + sub.replyObject.pic;
          sub.replyUser.pic = HOST_URL + '/media/' + sub.replyUser.pic;
          $scope.replies[index-1].subReplies.push(sub);
          $scope.articleReplies += 1;
        } else {
          xdAlert.show(data.msg);
        }
      });
      //console.log("1.type: reply", "2.object: " + object, "3.content: " + content, "4.comment: " + comment);
    };
    $scope.commentSubmit = function(content) {
      $scope.requesting = true;
      var article = $stateParams.url;
      CommentApi.addArticleReply({
        article: article,
        content: content
      }).success(function(data) {
        $scope.requesting = false;
        if (+data.status === 1) {
          //updateComments();
          clearSubmitForm();
          var n = $scope.replies.length;
          var reply = data.data.comment;
          if ($scope.replies[n-1]) {
            reply.index = $scope.replies[n-1].index + 1;
          } else {
            reply.index = 1;
          }

          reply.input = {show: false};
          reply.replyUser.pic = HOST_URL + '/media/' + reply.replyUser.pic;
          reply.subReplies = [];
          $scope.replies.push(reply);
          $scope.articleReplies += 1;
        } else {
          xdAlert.show(data.msg);
        }
      });
      //console.log("1.type: comment", "2.content: " + content, "3.article: " + article);
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

    updateComments();

    function updateComments() {
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
                index: self.index,
                url: self.url
              };
              $scope.replies.push(reply);
              $scope.articleReplies += 1;
              ArticleApi.getSubComments(self.url)
                .success(function(subData) {
                  reply.subReplies = [];
                  if (subData.results.length !== 0) {
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
                      $scope.articleReplies += 1;
                    });
                  }
                })
              ;
            });
          }
        })
      ;
    }


    function clearSubmitForm() {
      $scope.submitForm = {
        replyContent: '',
        commentContent: ''
      };
    }
  });
