'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatre-mapping', {
        template: '<theatre-mapping></theatre-mapping>'
      });
  });
