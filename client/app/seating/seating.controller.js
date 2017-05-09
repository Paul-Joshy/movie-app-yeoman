'use strict';

(function(){

class SeatingComponent {
  constructor($scope, $http, socket, booking) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.bookingService = booking;
  }

  $onInit(){
    var movieDetails = this.bookingService.getDetails();
    console.log(movieDetails);
  }
}

angular.module('movieApp')
  .component('seating', {
    templateUrl: 'app/seating/seating.html',
    controller: SeatingComponent,
    controllerAs: 'seatingCtrl'
  });

})();
