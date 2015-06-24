'use strict';

angular.module('angularMysite2')
  .controller('NavbarCtrl', function($state, $scope) {
    console.log($state, $state.current);
    $scope.index = 0;

    $scope.showSign = function() {
      console.log("show signin modal");
    };

    $scope.signOut = function() {
      console.log("signout");
    };

    $scope.selectIndex = function(index) {
      $scope.index = index;
    };

    $scope.user = {
      nickName: '毒枭东',
      isSignin: function() {
        return false;
      }
    };
  })
;
