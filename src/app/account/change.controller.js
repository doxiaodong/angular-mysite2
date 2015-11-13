'use strict';

angular.module('app')
  .controller('AccountChangeCtrl', function($scope, $state, AccountApi, xdAlert, utils) {

    $scope.requesting = false;
    $scope.data = {};
    $scope.usernamePattern = utils.usernamePattern;
    $scope.passwordPattern = utils.passwordPattern;

    $scope.submit = function() {
      $scope.requesting = true;
      AccountApi.changePassword($scope.data).success(function(data) {
        $scope.requesting = false;
        xdAlert.show(data.msg);
      }).error(function() {
        $scope.requesting = false;
      });
    };

    $scope.$on('account.signout', function() {
      $state.go('home');
    });

    $scope.$on('get_no_user_info', function() {
      $state.go('home');
    });
  })
;
