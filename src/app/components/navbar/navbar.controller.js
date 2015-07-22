'use strict';

angular.module('angularMysite2')
  .controller('NavbarCtrl', function($scope, $rootScope, $state, $timeout, xdAlert, AccountApi) {

    $scope.index = 0;
    var timeout;

    $rootScope.$on('pages.afterEnter', function() {
      changeViews();
    });

    $scope.showSign = function() {
      console.log("show signin modal");
      $rootScope.$broadcast('signModal.show');
    };

    $scope.signOut = function() {
      console.log("signout");
      AccountApi.signout()
        .success(function(data) {
          console.log(data);
        })
      ;
    };

    $scope.selectIndex = function(index) {
      $scope.index = index;
    };

    $scope.user = {
      nickName: '',
      isSignin: function() {
        return false;
      }
    };

    $rootScope.$on('get_user_info', function(e, data) {
      $scope.user = {
        nickName: data.nickname,
        isSignin: function() {
          return true;
        }
      };
    });

    $rootScope.$on('account.signout', function(e, data) {
      $scope.user = {
        nickName: '',
        isSignin: function() {
          return false;
        }
      };
    });


    function changeViews() {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function() {
        var views = $state.current.views;
        switch (true) {
          case !!views['home-tab']:
            $scope.index = 0;
            break;
          case !!views['article-tab']:
            $scope.index = 1;
            break;
          case !!views['account-tab']:
            $scope.index = 2;
            break;
          case !!views['fourth-tab']:
            $scope.index = 3;
        }
      }, 20);
    }
  })
;
