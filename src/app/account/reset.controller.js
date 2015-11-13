'use strict';

angular.module('app')
  .controller('AccountResetCtrl', function($scope, AccountApi, xdAlert, utils) {

    $scope.requesting = false;
    $scope.data = {};
    $scope.usernamePattern = utils.usernamePattern;
    $scope.passwordPattern = utils.passwordPattern;

    $scope.submit = function() {
      $scope.requesting = true;
      AccountApi.resetPassword($scope.data).success(function(data) {
        $scope.requesting = false;
        xdAlert.show(data.msg);
      }).error(function() {
        $scope.requesting = false;
      });
    };
  })
;
