'use strict';

angular.module('movieApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cities', {
        template: '<cities></cities>'
      });
  });
