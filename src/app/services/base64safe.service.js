angular.module('app')
  .factory('urlSafeBase64Util', function(base64Util) {
    var base64;
    base64 = base64Util;
    this.encode = function(v) {
      v = base64.encode(v);
      return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
    this.decode = function(v) {
      if (typeof v !== 'string') {
        return null;
      }
      v = v.replace(/_/g, '/').replace(/\-/g, '+');
      return base64.decode(v);
    };
    return this;
  });
