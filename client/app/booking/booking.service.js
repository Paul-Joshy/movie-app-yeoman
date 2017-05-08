'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  var movieDetails = {};
  movieDetails.name = "";
  movieDetails.date = "";
  movieDetails.time = "";

  this.setName = function(name){
    movieDetails.name = name;
  }

  this.setTimings = function(date, time){
    movieDetails.date = date;
    movieDetails.timg = time;
  }

  this.getDetails = function(){
    return movieDetails;
  }
}

angular.module('movieApp')
  .service('booking', bookingService);
