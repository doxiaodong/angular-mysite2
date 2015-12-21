'use strict';

angular.module('app')
.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    /* home-tab */
    .state('home', {
      url: '/',
      views: {
        'home-tab@': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    /* article-tab */
    .state('article', {
      abstract: true,
      url: '/article'
    })
    .state('article.articles', {
      url: '/:category',
      views: {
        'article-tab@': {
          templateUrl: 'app/article/article-list.html',
          controller: 'ArticleListCtrl'
        }
      }
    })
    .state('article.article', {
      url: '/:category/:url',
      views: {
        'article-tab@': {
          templateUrl: 'app/article/article-detail.html',
          controller: 'ArticleDetailCtrl'
        }
      }
    })
    /* account-tab */
    .state('account', {
      abstract: true,
      url: '/account'
    })
    .state('account.setting', {
      url: '/setting',
      views: {
        'account-tab@': {
          templateUrl: 'app/account/setting.html',
          controller: 'AccountSettingCtrl'
        }
      }
    })
    .state('account.info', {
      url: '/info/:user',
      views: {
        'account-tab@': {
          templateUrl: 'app/account/account-info.html',
          controller: 'AccountInfoCtrl'
        }
      }
    })
    .state('account.change', {
      url: '/changePassword',
      views: {
        'account-tab@': {
          templateUrl: 'app/account/change.html',
          controller: 'AccountChangeCtrl'
        }
      }
    })
    .state('account.reset', {
      url: '/resetPassword',
      views: {
        'account-tab@': {
          templateUrl: 'app/account/reset.html',
          controller: 'AccountResetCtrl'
        }
      }
    })

    /* fourth-tab */
    .state('fourth', {
      abstract: true,
      url: '/self'
    })
    .state('fourth.index', {
      url: '/waiting',
      views: {
        'fourth-tab@': {
          templateUrl: 'app/fourth/fourth.html',
          controller: 'FourthIndexCtrl'
        }
      }
    })
  ;

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true).hashPrefix('!');
});
