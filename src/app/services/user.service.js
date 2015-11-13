'use strict';

angular.module('app')
  .service('UserService', function($rootScope) {
    var user = null;

    this.save = function(u) {
      user = u;
      if (u === '') {
        $rootScope.$broadcast('account.signout');
      } else {
        $rootScope.$broadcast('get_user_info', u);
      }
    };

    this.get = function() {
      return user;
    };
  })
;
