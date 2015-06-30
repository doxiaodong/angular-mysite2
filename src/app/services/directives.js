'use strict';

angular.module('angularMysite2')
  .directive('langTranslate', function($translate, $rootScope, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/lang-translate.html',
      link: function (scope, element, attr) {

        var language = $translate.storage().get() || 'zh_CN';

        scope.selected = language;
        scope.langs = [{
          key: 'zh_CN',
          word: '中文'
        }, {
          key: 'en_US',
          word: 'English'
        }];
        scope.show = false;

        scope.changeLanguage = function (key) {
          $translate.use(key);
          scope.selected = key;
          scope.show = false;

          $timeout(function() {
            $rootScope.$broadcast('languageChange');
          }, 30);
        };
      }
    };
  })
  .directive('signModal', function(utils) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/sign-modal.html',
      link: function (scope, element, attr) {
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
        // auto input
        scope.signin = {
          username: 'sssssssss',
          password: ''
        };
        scope.register = {

        };

        scope.closeShowModal = function() {
          scope.showModal = false;
        }
      }
    };
  })
  .directive('xdTitle', function(setTitle, $rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var time = $rootScope.isFirst ? 500 : 20;
        $timeout(function() {
          setTitle.brocastTitle(attr.xdTitle);
        }, time);
        $rootScope.$on('languageChange', function() {
          setTitle.brocastTitle(attr.xdTitle);
        });
      }
    };
  })
  .directive('xdAlert', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/xd-alert.html',
      link: function(scope, element, attr) {
        scope.showAlert = false;
        scope.opts = {};
        scope.$on('alert.show', function(e, opts) {
          scope.opts.title = opts.title === undefined ? attr.alertTitle : opts.title;
          scope.opts.ok = opts.ok === undefined ? attr.alertOk : opts.ok;
          scope.opts.content = opts.content;
          scope.opts.callback = opts.callback;
          scope.showAlert = true;
        });

        scope.closeAlert = function() {
          scope.showAlert = false;
          if (scope.opts.callback) {
            scope.opts.callback();
          }
        }
      }
    };
  })
;
