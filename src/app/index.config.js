'use strict';

angular.module('app')
.config(function(markedProvider) {

  //markedProvider.setOptions({
  //  gfm: true,
  //  tables: true,
  //  highlight: function(code) {
  //    return hljs.highlightAuto(code).value;
  //  }
  //});
  markedProvider.setRenderer({
    heading: function (text, level) {
      var ele = document.createElement('a');
      ele.innerHTML = text;
      var innerText = angular.element(ele).text();
      //var encodeText = encodeURI(innerText);
      return '<h'
        + level
        + ' id="'
        + innerText
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
    },
    code: function(text, language) {
      var lang = '';
      if (language) {
        lang = ' lang-' + language;
      }
      var html = hljs.highlightAuto(text).value;
      var lines = new Array(html.split(/\n/).length + 1).join('<span></span>');

      return '<pre><code class="hljs'
        + lang
        + '"><span class="hjln">'
        + lines
        + '</span>'
        + html
        + '</code></pre>';
    }
  });
})
.config(function($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('escaped');

  $translateProvider.useStaticFilesLoader({
    prefix: 'static/languages/',
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
