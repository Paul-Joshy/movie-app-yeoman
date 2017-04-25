'use strict';

angular.module('movieApp.auth', ['movieApp.constants', 'movieApp.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
