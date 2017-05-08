'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/timings', {
        template: '<timings></timings>'
      });
  });
