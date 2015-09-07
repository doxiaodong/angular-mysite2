'use strict';

angular.module('app')
.config(function(markedProvider) {
  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
})
.config(function($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('escaped');

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('zh_CN');
  $translateProvider.useLocalStorage();
})
.config(function($httpProvider, localStorageServiceProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('HttpInterceptor');
  localStorageServiceProvider.setPrefix('xd');
});
