'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  this.movieDetails = {};
  this.movieDetails.theatre = "";
  this.movieDetails.name = "";
  this.movieDetails.date = "";
  this.movieDetails.time = "";
  this.movieDetails.selectedSeats = [];
  this.movieDetails.grandTotal = "";
  this.paymentDetails ={};
}

angular.module('movieApp')
  .service('booking', bookingService);
