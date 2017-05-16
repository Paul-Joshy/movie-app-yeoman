'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  var movieDetails = {};
  movieDetails.theatre = "";
  movieDetails.name = "";
  movieDetails.date = "";
  movieDetails.time = "";
  movieDetails.selectedSeats = [];
  movieDetails.grandTotal = "";
  var paymentDetails ={};

  this.setName = function(name){
    movieDetails.name = name;
  }

  this.addTheatre = function(theatre, date, time){
    movieDetails.theatre = theatre;
    movieDetails.date = date;
    movieDetails.time = time;
  }

  this.addSelected = function(selected, grandTotal){
    movieDetails.selectedSeats = selected;
    movieDetails.grandTotal = grandTotal;
  }

  this.getDetails = function(){
    return movieDetails;
  }
}

angular.module('movieApp')
  .service('booking', bookingService);
