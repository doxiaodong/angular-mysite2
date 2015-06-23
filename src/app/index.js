'use strict';

angular.module('angularMysite2', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'pascalprecht.translate', 'angular-md5', 'LocalStorageModule'])
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
        url: '/article/',
        views: {
          'article-tab': {
            templateUrl: 'app/article/article-list.html',
            controller: 'ArticleListCtrl'
          }
        }
      })
      /* account-tab */
      ;

    $urlRouterProvider.otherwise('/');
  })
  .config(function($translateProvider) {
  	$translateProvider.useSanitizeValueStrategy('escaped');

  	$translateProvider.useStaticFilesLoader({
	    prefix: "/languages/",
	    suffix: ".json"
	  });
  	$translateProvider.preferredLanguage("en_US");
  	$translateProvider.useLocalStorage();
  })
  .config(function(localStorageServiceProvider) {
  	localStorageServiceProvider.setPrefix('xd');
  })
;
