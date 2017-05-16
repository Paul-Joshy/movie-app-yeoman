'use strict';

(function(){

class SeatingComponent {
  constructor($scope, $http, socket, booking, $location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.bookingService = booking;
    this.rows = ['A','B','C','D','E','F'];
    this.columns = [1,2,3,4,5,6,7,8,9,10];
    // this.selected = false;
    this.selectedSeats = [];
    this.bookedSeats = undefined;
    this.bookingForm = {};
    this.$location = $location;
    this.movieDetails = {};
  }

  $onInit(){
    this.$http.get('/api/payments').then(response => {
      this.bookedSeats = _.flatten( _.map( response.data, (seat)=>{ return seat.bookedSeats }) );
      console.log(this.bookedSeats);
    } );
    this.movieDetails = this.bookingService.getDetails();
    console.log(this.movieDetails);
    console.log(this.rows);
    console.log(this.columns);
    console.log(this.selectedSeats);
  }

  isSelected(row, col){
    if(_.find(this.selectedSeats, function(seat){ return seat.row === row && seat.col === col })){
      return true;
    } else {
      return false;
    }
  }

  isBooked(row, col){
    if(_.find(this.bookedSeats, function(seat){ return seat.row === row && seat.col === col})){
      console.log(this.bookedSeats);
        return true;
    } else{
      return false;
    }
  }

  selectSeat(row, col, classType){
    if(!this.isSelected(row, col) && !this.isBooked(row, col)){
      console.log("selected");
      this.selectedSeats.push({
        row: row,
        col: col,
        classType: classType
      });
    }

    else{
      this.selectedSeats = _.reject(this.selectedSeats, function(seat){ return seat.row === row && seat.col===col })
    }

    this.bookingForm.gold = _.filter(this.selectedSeats, function(seat){ return seat.classType === "gold" });
    this.bookingForm.silver = _.filter(this.selectedSeats, function(seat){ return seat.classType === "silver"})
    this.bookingForm.grandTotal = ( (this.bookingForm.gold.length * 200) + (this.bookingForm.silver.length * 100) + 30)
    console.log(this.bookingForm);
    console.log(this.selectedSeats);
  }

  bookSeats(){
    console.log("shoop baby");
    this.bookingService.addSelected(this.selectedSeats, this.bookingForm.grandTotal);
    console.log(this.bookingService.getDetails());
    this.movieDetails = this.bookingService.getDetails();
    this.bookedSeats = this.movieDetails.bookedSeats;
    this.selectedSeats = [];
    this.$location.path('/payment');
  }
}

angular.module('movieApp')
  .component('seating', {
    templateUrl: 'app/seating/seating.html',
    controller: SeatingComponent,
    controllerAs: 'seatingCtrl'
  });

})();
