'use strict';

(function(){

class PaymentComponent {
  constructor($http, $scope, socket, booking, $location) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket,
    this.bookingService = booking;
    this.$location = $location
  }

  $onInit(){
    this.movieDetails = this.bookingService.movieDetails;
    console.log(this.movieDetails);
  }

  pay(){
    console.log(this.movieDetails);
    this.$http.post('/api/payments',{
      name: this.movieDetails.name,
      theatre: this.movieDetails.theatre,
      bookedSeats: this.movieDetails.selectedSeats,
      grandTotal: this.movieDetails.grandTotal,
      date: this.movieDetails.date,
      time: this.movieDetails.time
    })
    .then(response =>{
      console.log(response);
      this.$location.path('/confirmation');
    });
  }

}

angular.module('movieApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
