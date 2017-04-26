'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatres', {
        template: '<theatres></theatres>'
      });
  });
