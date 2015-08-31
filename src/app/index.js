'use strict';

angular.module('app', []);

angular.module('darlin', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ui.router',
  'pascalprecht.translate',
  'angular-md5',
  'LocalStorageModule',
  'app'
])
  .constant('HOST_URL', '//api.darlin.me')
  .constant('STATIC_URL', '//dn-darlinme.qbox.me/')
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
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
      .state('article', {
        url: '/article',
        views: {
          'article-tab': {
            template: '<div ui-view="article-tab"></div>'
          }
        }
      })
      .state('article.articles', {
        url: '/:category/',
        views: {
          'article-tab': {
            templateUrl: 'app/article/article-list.html',
            controller: 'ArticleListCtrl'
          }
        }
      })
      .state('article.article', {
        url: '/:category/:url/',
        views: {
          'article-tab': {
            templateUrl: 'app/article/article-detail.html',
            controller: 'ArticleDetailCtrl'
          }
        }
      })
      /* account-tab */
      .state('account', {
        url: '/account',
        views: {
          'account-tab': {
            template: '<div ui-view="account-tab"></div>'
          }
        }
      })
      .state('account.info', {
        url: '/:user',
        views: {
          'account-tab': {
            templateUrl: 'app/account/account-info.html',
            controller: 'AccountInfoCtrl'
          }
        }
      })
      .state('account.setting', {
        url: '/setting/',
        views: {
          'account-tab': {
            templateUrl: 'app/account/setting.html',
            controller: 'AccountSettingCtrl'
          }
        }
      })

      /* fourth-tab */
      .state('fourth', {
        url: '/fourth',
        views: {
          'fourth-tab': {
            template: '<div ui-view="fourth-tab"></div>'
          }
        }
      })
      .state('fourth.index', {
        url: '/index/',
        views: {
          'fourth-tab': {
            templateUrl: 'app/fourth/fourth.html',
            controller: 'FourthIndexCtrl'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  })
  .config(function($translateProvider) {
  	$translateProvider.useSanitizeValueStrategy('escaped');

  	$translateProvider.useStaticFilesLoader({
	    prefix: 'languages/',
	    suffix: '.json'
	  });
  	$translateProvider.preferredLanguage('en_US');
  	$translateProvider.useLocalStorage();
  })
  .config(function($httpProvider, localStorageServiceProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('HttpInterceptor');
  	localStorageServiceProvider.setPrefix('xd');
  })
  .run(function($rootScope, $window, $document, $state, $translate, localStorageService, CommonApi, xdLoading) {
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

    $rootScope.$on('$stateChangeStart', function() {
      xdLoading.show();
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.$state = $state;
      xdLoading.hide();
    });

  })
;
