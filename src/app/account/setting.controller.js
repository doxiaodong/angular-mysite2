'use strict';

angular.module('app')
  .controller('AccountSettingCtrl', function($scope, $rootScope, $window, $state, utils, AccountApi, STATIC_URL_HOST, HEAD_PIC_STYLE, xdAlert) {
    $scope.requesting = false;
    $scope.dirty = false;
    $scope.usernamePattern = utils.usernamePattern;
    $scope.changePic = function(e) {
      var files = e.target.files;
      var pic = files[0];
      $scope.setting.pic = $window.URL.createObjectURL(pic);
      $scope.dirty = true;
      $scope.$apply();
    };
    if ($window.user) {
      //console.log($window.user, 2)
      getUser($window.user);
    }

    $scope.$on('get_user_info', function (e, data) {
      getUser(data);
    });

    $scope.$on('account.signout', function() {
      $state.go('home');
    });

    $scope.$on('get_no_user_info', function() {
      $state.go('home');
    });

    $scope.submit = function() {
      var form = document.forms.namedItem('ACCOUNT_SETTING');
      var formData = new FormData(form);
      $scope.requesting = true;
      AccountApi.changeProfile({
        data: formData
      }).success(function(data) {
        if (+data.status === 1) {

        }
        $scope.requesting = false;
        xdAlert.show(data.msg);
      });
    };

    function getUser(user) {
      $scope.setting = {
        username: user.username,
        email: user.email,
        nickname: user.nickname,
        pic: STATIC_URL_HOST + user.pic + HEAD_PIC_STYLE,
        sex: user.sex
      };
    }
  })
;
