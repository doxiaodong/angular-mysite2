'use strict';

angular.module('app')
  .controller('AccountInfoCtrl', function($scope, $state, $stateParams, utils, AccountApi, ArticleApi, STATIC_URL_HOST, HEAD_PIC_STYLE, UserService, urlSafeBase64Util) {
    $scope.encode = urlSafeBase64Util.encode;

    $scope.itsMe = false;
    $scope.replies = [];
    $scope.repliesOfArticle = [];

    $scope.replyContainerFold = false;
    $scope.commentContainerFold = false;

    $scope.$on('account.signout', function() {
      $scope.itsMe = false;
    });

    AccountApi.getUserInfo({
      username: $stateParams.user
    })
      .success(function(data) {
        if (+data.status === 1) {
          $scope.profile = data.data.user;
          $scope.profile.pic = STATIC_URL_HOST + data.data.user.pic + HEAD_PIC_STYLE;
          $scope.profile.lastSignin = data.data.user.last_login;
        } else {
          $state.go('home');
        }
      })
    ;

    if (UserService.get()) {
      $scope.itsMe = utils.itsMe(UserService.get().username, $stateParams.user);
      getReplies(UserService.get().username);
      getRepliesOfArticle(UserService.get());
    }
    $scope.$on('get_user_info', function(e, data) {
      $scope.replies = [];
      $scope.repliesOfArticle = [];
      $scope.itsMe = utils.itsMe(data.username, $stateParams.user);
      getReplies(data.username);
      getRepliesOfArticle(data);
    });
    
    $scope.signout = function() {
      AccountApi.signout()
        .success(function(data) {
        })
      ;
    };

    function getRepliesOfArticle(user) {
      if (+user.id === 1 || +user.id === 2) {
        ArticleApi.getAllComments()
          .success(function(data) {
            if (data.results.length !== 0) {
              angular.forEach(data.results, function(self) {
                var reply = {
                  replyUser: {
                    nickName: self.reply_user.nickname,
                    username: self.reply_user.username,
                    pic: STATIC_URL_HOST + self.reply_user.pic + HEAD_PIC_STYLE
                  },
                  article: self.article,
                  content: self.content,
                  time: self.reply_time
                };
                $scope.repliesOfArticle.unshift(reply);
              });
            }
          });
        $scope.supperUser = true;
      }
    }

    function getReplies(username) {
      if ($scope.itsMe) {
        AccountApi.getAccountSubComments({
          user: username
        })
          .success(function(data) {
            //console.log(data);
            if (data.results.length !== 0) {
              angular.forEach(data.results, function(self) {
                var reply = {
                  replyUser: {
                    nickName: self.reply_user.nickname,
                    username: self.reply_user.username,
                    pic: STATIC_URL_HOST + self.reply_user.pic + HEAD_PIC_STYLE
                  },
                  article: self.head.article,
                  content: self.content,
                  time: self.reply_time
                };
                $scope.replies.unshift(reply);
              });
            }
          })
        ;
      }
    }

  })
;
