'use strict';

angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ui.router',
  'pascalprecht.translate',
  'angular-md5',
  'LocalStorageModule',
  'hc.marked'
]);

angular.module('darlin', [
  'app'
]);
