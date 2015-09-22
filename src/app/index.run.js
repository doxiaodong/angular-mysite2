'use strict';

angular.module('app')
.run(function($rootScope, $window, $document, $state, $translate, $timeout, localStorageService, CommonApi, xdLoading, DEFAULT_LANGUAGE, VERSION) {

  $rootScope.VERSION = VERSION;

  if ($rootScope.isFirst === undefined) {
    $rootScope.isFirst = true;
  }

  $rootScope.$state = $state;

  CommonApi.initHomePage();
  $rootScope.title = '毒枭东';
  $rootScope.$on('titleChange', function(e, title) {
    $rootScope.isFirst = false;
    $rootScope.title = title;
    $rootScope.$broadcast('pages.afterEnter');
  });
  $document.bind('visibilitychange', function() {
    var state = this.visibilityState;
    if (state === 'hidden') {
      $window.sessionStorage.setItem('visibilityChangeTitle', $rootScope.title);
      var title = '点我瞧瞧吧～';
      var language = $translate.storage().get() || DEFAULT_LANGUAGE;
      if (language === 'en_US') {
        title = 'Click me to see see~';
      }
      $rootScope.title = title;
    }
    if (state === 'visible') {
      $rootScope.title = $window.sessionStorage.getItem('visibilityChangeTitle');
      $window.sessionStorage.removeItem('visibilityChangeTitle');
    }
    $rootScope.$apply();
  });

  $rootScope.$on('$stateChangeStart', function() {
    xdLoading.show();
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.$state = $state;
    xdLoading.hide();
  });

  $rootScope.language = $translate.storage().get() || DEFAULT_LANGUAGE;
  switchLanguage($rootScope.language);

  $rootScope.$on('languageChange', function(e, key) {
    switchLanguage(key);
  });

  function switchLanguage(key) {
    switch (key) {
      case 'en_US':
        $rootScope.language = 'en';
        break;
      default:
        $rootScope.language = 'zh-cmn-Hans';
    }
  }

});
