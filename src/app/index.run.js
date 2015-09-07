'use strict';

angular.module('app')
.run(function($rootScope, $window, $document, $state, $translate, localStorageService, CommonApi, xdLoading, DEFAULT_LANGUAGE) {

  $rootScope.VERSION = '2.0.1';

  if ($rootScope.isFirst === undefined) {
    $rootScope.isFirst = true;
  }

  $rootScope.$state = $state;

  CommonApi.initHomePage();
  $rootScope.title = '毒枭东';
  $rootScope.$on('titleChange', function(e, title) {
    $rootScope.isFirst = false;
    $rootScope.title = title;
    $rootScope.$emit('pages.afterEnter');
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

});
