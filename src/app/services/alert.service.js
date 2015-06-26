'use strict';

angular.module('angularMysite2')
  .service('xdAlert', function($rootScope) {
    this.show = function(content, opts, callbackOk) {
      var oopts = {};

      if (typeof opts === 'function') {
        callbackOk = arguments[1];
      } else {
        if (opts !== undefined) {
          if (opts.title) oopts.title = opts.title;
          if (opts.ok) oopts.ok = opts.ok;
        }
      }
      oopts.content = content;
      oopts.callback = callbackOk;
      $rootScope.$broadcast('alert.show', oopts);
    };
  })
;
