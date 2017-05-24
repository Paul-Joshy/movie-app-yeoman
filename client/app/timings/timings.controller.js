'use strict';

(function(){

class TimingsComponent {
  constructor($scope, $http, socket, booking, $location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.socket = socket;
    this.theatreMappings = [];
    this.filteredMappings = [];
    this.dates = [];
    this.bookingService = booking;
    this.$location = $location;
    this.timings = {};
    this.backdrop = "";
  }

  $onInit() {
    this.$http.get('/api/theatre-mappings/')
    .then(response => {
      this.theatreMappings = response.data;

      var movieDetails = this.bookingService.movieDetails;
      this.theatreMappings =  _.filter(this.theatreMappings, function(mapping){ return mapping.movie === movieDetails.name})
      this.backdrop = this.bookingService.backdrop;
      console.log(movieDetails);

      for( var mapping of this.theatreMappings){
        for( var i=0; i<mapping.dates.length; i++){
          this.dates.push(mapping.dates[i]);
        }
      }
      this.dates = _.uniq(this.dates);
      this.dates = _.sortBy( this.dates, (date)=>{ return date } );
    });
  }

  genDate(date){
    var day = new Date(date).getDate();
    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()];
    var year = new Date(date).getFullYear();
    return `${day}, ${dayName}`;
  }

  genTiming(timing){
    var hours = new Date(timing).getHours();
    var minutes = new Date(timing).getMinutes();
    return `${hours}.${minutes}`;
  }

  selectDate(date){
    this.timings.date = date;
    this.filteredMappings = _.filter(this.theatreMappings, function(mapping){ return _.contains(mapping.dates, date) });
  }

  selectTimings(theatre, time){
    console.log(theatre, this.timings.date, time);
    this.bookingService.movieDetails.theatre = theatre;
    this.bookingService.movieDetails.date = this.timings.date;
    this.bookingService.movieDetails.time = time;
    console.log(this.bookingService.movieDetails);
    this.$location.path('/seating');
  }

}

angular.module('movieApp')
  .component('timings', {
    templateUrl: 'app/timings/timings.html',
    controller: TimingsComponent,
    controllerAs: 'timingsCtrl'
  });

})();
