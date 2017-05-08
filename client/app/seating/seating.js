'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seating', {
        template: '<seating></seating>'
      });
  });
