'use strict';

angular.module('movieApp', ['movieApp.auth', 'movieApp.admin', 'movieApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ngRoute', 'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
