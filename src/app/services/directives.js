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
  .directive('signModal', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/sign-modal.html',
      link: function (scope, element, attr) {
        scope.signin = {
          username: '',
          password: ''
        };
        scope.register = {

        };
      }
    };
  })
  .directive('xdTitle', function(setTitle, $rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        $timeout(function() {
          setTitle.brocastTitle(attr.xdTitle);
        }, 20);
        $rootScope.$on('languageChange', function() {
          setTitle.brocastTitle(attr.xdTitle);
        });
      }
    };
  })
;
