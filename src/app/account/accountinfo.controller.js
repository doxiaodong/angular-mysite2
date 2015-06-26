'use strict';

angular.module('angularMysite2')
  .controller('AccountInfoCtrl', function($scope) {

    $scope.itsMe = function() {
      return true;
    };

    $scope.profile = {
      pic: 'assets/images/web-app/touch-icon-iphone-retina.png',
      nickName: '杜小东',
      email: 'duxiaodong@darlin.me',
      lastSignin: '2014-12-14',
      sex: {
        type: 0,
        word: '男'
      }
    };

    $scope.replies = [{
      replyUser: {
        nickName: '毒枭东',
        username: 'duxiaodong',
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png'
      },
      articleDetailTitle: '早上好！',
      content: '晚上好呀～',
      time: '2015-04-15'
    }, {
      replyUser: {
        nickName: '简小小',
        username: 'jxx',
        pic: 'assets/images/web-app/touch-icon-iphone-retina.png'
      },
      articleDetailTitle: '早上好！',
      content: '晚上好呀～大笨蛋',
      time: '2015-04-15'
    }];
  })
;
