'use strict';

angular.module('app')
  .directive('langTranslate', function($translate, $rootScope, $timeout, $document, DEFAULT_LANGUAGE) {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/lang-translate.html',
      link: function (scope, element, attr) {

        var language = $translate.storage().get() || DEFAULT_LANGUAGE;

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
            $rootScope.$broadcast('languageChange', key);
          }, 30);
        };

        $document.bind('click', function() {
          if (scope.show) {
            scope.show = false;
            scope.$apply();
          }
        });

        element.bind('click', function(e) {
          e.stopPropagation();
        });

      }
    };
  });
