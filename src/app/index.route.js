'use strict';

angular.module('app')
.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('views', {
      abstract: true,
      templateUrl: 'app/ui-views/ui-views.html'
    })

    /* home-tab */
    .state('views.home', {
      url: '/',
      views: {
        'home-tab@views': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    /* article-tab */
    .state('views.article', {
      abstract: true,
      url: '/article'
    })
    .state('views.article.articles', {
      url: '/:category',
      views: {
        'article-tab@views': {
          templateUrl: 'app/article/article-list.html',
          controller: 'ArticleListCtrl'
        }
      }
    })
    .state('views.article.article', {
      url: '/:category/:url',
      views: {
        'article-tab@views': {
          templateUrl: 'app/article/article-detail.html',
          controller: 'ArticleDetailCtrl'
        }
      }
    })
    /* account-tab */
    .state('views.account', {
      abstract: true,
      url: '/account'
    })
    .state('views.account.setting', {
      url: '/setting',
      views: {
        'account-tab@views': {
          templateUrl: 'app/account/setting.html',
          controller: 'AccountSettingCtrl'
        }
      }
    })
    .state('views.account.info', {
      url: '/info/:user',
      views: {
        'account-tab@views': {
          templateUrl: 'app/account/account-info.html',
          controller: 'AccountInfoCtrl'
        }
      }
    })
    .state('views.account.change', {
      url: '/changePassword',
      views: {
        'account-tab@views': {
          templateUrl: 'app/account/change.html',
          controller: 'AccountChangeCtrl'
        }
      }
    })
    .state('views.account.reset', {
      url: '/resetPassword',
      views: {
        'account-tab@views': {
          templateUrl: 'app/account/reset.html',
          controller: 'AccountResetCtrl'
        }
      }
    })

    /* fourth-tab */
    .state('views.fourth', {
      abstract: true,
      url: '/self'
    })
    .state('views.fourth.index', {
      url: '/waiting',
      views: {
        'fourth-tab@views': {
          templateUrl: 'app/fourth/fourth.html',
          controller: 'FourthIndexCtrl'
        }
      }
    })
  ;

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true).hashPrefix('!');
});
