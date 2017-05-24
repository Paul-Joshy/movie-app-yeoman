'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/receipt', {
        template: '<receipt></receipt>'
      });
  });
