'use strict';

angular.module('app')
  .directive('signModal', function($rootScope, localStorageService, utils, AccountApi, xdAlert) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/sign-modal.html',
      link: function (scope, element, attr) {

        scope.requesting = false;
        element.on('scroll', function(e) {
          e.stopPropagation();
        });

        scope.usernamePattern = utils.usernamePattern;
        scope.passwordPattern = utils.passwordPattern;
        scope.showModal = false;
        scope.signinModel = true;
        scope.$on('signModal.show', function() {
          scope.showModal = true;
        });
        var user = localStorageService.get('user');
        if (user) {
          scope.signin = user;
        } else {
          scope.signin = {};
        }
        // auto input
        scope.register = {

        };

        scope.closeShowModal = function() {
          scope.showModal = false;
        };

        scope.signinSubmit = function() {
          scope.requesting = true;
          AccountApi.signin({
            username: scope.signin.username,
            password: scope.signin.password
          })
            .success(function(data) {
              scope.requesting = false;
              if (+data.status === 1) {
                scope.closeShowModal();
              } else {
                xdAlert.show(data.msg);
              }
            })
          ;
        };

        scope.registerSubmit = function() {
          scope.requesting = true;
          AccountApi.register({
            username: scope.register.username,
            password: scope.register.password,
            nickname: scope.register.nickname,
            email: scope.register.email
          }).success(function(data) {
            scope.requesting = false;
            if (+data.status === 1) {
              scope.closeShowModal();
            } else {
              xdAlert.show(data.msg);
            }
          });
        };
      }
    };
  });
