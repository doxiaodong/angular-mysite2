'use strict';

angular.module('angularMysite2')
  .controller('AccountInfoCtrl', function($scope, $rootScope, $state, $stateParams, utils, AccountApi, ArticleApi, HOST_URL) {
    $scope.itsMe = false;
    $scope.replies = [];
    $scope.repliesOfArticle = [];

    AccountApi.getUserInfo({
      username: $stateParams.user
    })
      .success(function(data) {
        if (+data.status === 1) {
          $scope.profile = data.data.user;
          $scope.profile.pic = HOST_URL + '/media/' + data.data.user.pic;
          $scope.profile.lastSignin = data.data.user.last_login;
        } else {
          $state.go('home');
        }
      })
    ;

    if ($rootScope.user) {
      $scope.itsMe = utils.itsMe($rootScope.user.username, $stateParams.user);
      getReplies($rootScope.user.username);
      getRepliesOfArticle($rootScope.user);
    } else {
      $rootScope.$on('get_user_info', function(e, data) {
        $scope.itsMe = utils.itsMe(data.username, $stateParams.user);
        getReplies(data.username);
        getRepliesOfArticle(data);
      });
    }

    function getRepliesOfArticle(user) {
      if (+user.id === 1) {
        ArticleApi.getAllComments()
          .success(function(data) {
            if (data.results.length !== 0) {
              angular.forEach(data.results, function(self) {
                var reply = {
                  replyUser: {
                    nickName: self.reply_user.nickname,
                    username: self.reply_user.username,
                    pic: self.reply_user.pic
                  },
                  article: self.article,
                  content: self.content,
                  time: self.reply_time
                };
                $scope.repliesOfArticle.unshift(reply);
              });
            }
          });
      }
    }

    function getReplies(username) {
      if ($scope.itsMe) {
        AccountApi.getAccountSubComments({
          user: username
        })
          .success(function(data) {
            console.log(data);
            if (data.results.length !== 0) {
              angular.forEach(data.results, function(self) {
                var reply = {
                  replyUser: {
                    nickName: self.reply_user.nickname,
                    username: self.reply_user.username,
                    pic: self.reply_user.pic
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
