'use strict';

angular.module('angularMysite2', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'pascalprecht.translate', 'angular-md5', 'LocalStorageModule'])
  .constant('HOST_URL', 'http://localhost:9999')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      /* home-tab */
      .state('home', {
        url: '/',
        views: {
          'home-tab': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      /* article-tab */
      .state('articles', {
        url: '/article/:category/',
        views: {
          'article-tab': {
            templateUrl: 'app/article/article-list.html',
            controller: 'ArticleListCtrl'
          }
        }
      })
      .state('article', {
        url: '/article/:category/:id/',
        views: {
          'article-tab': {
            templateUrl: 'app/article/article-detail.html',
            controller: 'ArticleDetailCtrl'
          }
        }
      })
      /* account-tab */
      .state('accountInfo', {
        url: '/account/:user',
        views: {
          'account-tab': {
            templateUrl: 'app/account/account-info.html',
            controller: 'AccountInfoCtrl'
          }
        }
      })

      /* fourth-tab */
      ;

    $urlRouterProvider.otherwise('/');
  })
  .config(function($translateProvider) {
  	$translateProvider.useSanitizeValueStrategy('escaped');

  	$translateProvider.useStaticFilesLoader({
	    prefix: 'app/../languages/',
	    suffix: '.json'
	  });
  	$translateProvider.preferredLanguage('en_US');
  	$translateProvider.useLocalStorage();
  })
  .config(function(localStorageServiceProvider) {
  	localStorageServiceProvider.setPrefix('xd');
  })
  .run(function($rootScope, $window, $document, $translate, localStorageService, CommonApi) {
    CommonApi.initHomePage()
      .success(function(data, status, headers) {
        console.log(data, headers());
      });
    $rootScope.title = '亲爱的小窝';
    $rootScope.$on('titleChange', function(e, title) {
      $rootScope.title = title;
      $rootScope.$emit('pages.afterEnter');
    });
    $document[0].addEventListener('visibilitychange', function() {
      var state = $document[0].visibilityState;
      if (state === 'hidden') {
        $window.sessionStorage.setItem('visibilityChangeTitle', $rootScope.title);
        var title = '点我瞧瞧吧～';
        var language = $translate.storage().get() || 'zh_CN';
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

  })
;
