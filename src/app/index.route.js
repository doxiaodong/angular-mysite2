'use strict';

angular.module('app')
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
      url: '/:category',
      views: {
        'article-tab': {
          templateUrl: 'app/article/article-list.html',
          controller: 'ArticleListCtrl'
        }
      }
    })
    .state('article.article', {
      url: '/:category/:url',
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
    .state('account.setting', {
      url: '/setting',
      views: {
        'account-tab': {
          templateUrl: 'app/account/setting.html',
          controller: 'AccountSettingCtrl'
        }
      }
    })
    .state('account.info', {
      url: '/info/:user',
      views: {
        'account-tab': {
          templateUrl: 'app/account/account-info.html',
          controller: 'AccountInfoCtrl'
        }
      }
    })

    /* fourth-tab */
    .state('fourth', {
      url: '/self',
      views: {
        'fourth-tab': {
          template: '<div ui-view="fourth-tab"></div>'
        }
      }
    })
    .state('fourth.index', {
      url: '/waiting',
      views: {
        'fourth-tab': {
          templateUrl: 'app/fourth/fourth.html',
          controller: 'FourthIndexCtrl'
        }
      }
    })
  ;

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true).hashPrefix('!');
});
