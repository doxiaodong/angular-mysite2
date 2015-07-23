'use strict';

angular.module('angularMysite2')
  .controller('AccountSettingCtrl', function($scope, $rootScope, $window, utils, AccountApi, HOST_URL, xdAlert) {
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

    if ($rootScope.user) {
      getUser($rootScope.user);
    } else {
      $rootScope.$on('get_user_info', function (e, data) {
        getUser(data);
      });
    }

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
        pic: HOST_URL + '/media/' + user.pic,
        sex: user.sex
      }
    }
  })
;
