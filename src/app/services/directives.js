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
            $rootScope.$broadcast('languageChange');
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
  })
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
  })
  .directive('xdTitle', function(setTitle, $rootScope, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var time = $rootScope.isFirst ? 500 : 20;
        scope.$on('title.get', function(e, title) {
          setTitle.brocastTitle(title);
        });
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
        };
      }
    };
  })
  .directive('customOnChange', function() {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        //console.log(scope, element)
        element.bind('change', onChangeHandler);
      }
    };
  })
  .directive('xdFooter', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/components/footer/footer.html'
    };
  })
  .directive('xdNavbar', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/components/navbar/navbar.html'
    };
  })
  .directive('xdLoading', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'app/templates/xd-loading.html',
      link: function(scope, element, attr) {
        scope.showLoading = false;
        var loadingNum = 0;
        scope.$on('loading.show', function() {
          loadingNum++;
          scope.showLoading = true;
          //console.log(loadingNum, 'show');
        });
        scope.$on('loading.hide', function() {
          loadingNum--;
          if (loadingNum <= 0) {
            loadingNum = 0;
            scope.showLoading = false;
          }
          //console.log(loadingNum, 'hide');
        });
      }
    };
  })
  .directive('xdPlatform', function($window, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var ua = $window.navigator.userAgent;
        scope.mobile = ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && ua.match(/Mobile/i) !== null;
        scope.standalone = $window.navigator.standalone;
        $rootScope.platform = {
          mobile: scope.mobile,
          standalone: scope.standalone
        };
      }
    };
  })
;
