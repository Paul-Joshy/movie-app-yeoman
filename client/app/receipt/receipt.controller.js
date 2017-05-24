'use strict';

(function(){

class ReceiptComponent {
  constructor($http, booking) {
    this.message = 'Hello';
    this.$http = $http;
    this.bookingService = booking;
  }

  $onInit(){
    console.log(this.bookingService);
    this.zip = _.flatten( this.bookingService.movieDetails.selectedSeats );
    // this.zip = _.zip( _.pluck(this.bookingService.movieDetails.selectedSeats, 'row'), _.pluck(this.bookingService.movieDetails.selectedSeats, 'col') );
  }

}


angular.module('movieApp')
  .component('receipt', {
    templateUrl: 'app/receipt/receipt.html',
    controller: ReceiptComponent,
    controllerAs: 'receiptCtrl'
  });

})();
