'use strict';

(function(){

class TimingsComponent {
  constructor($scope, $http, socket, booking) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.socket = socket;
    this.theatreMappings = [];
    this.dates = [];
    this.bookingService = booking;
  }

  $onInit() {
    this.$http.get('/api/theatre-mappings/')
    .then(response => {
      this.theatreMappings = response.data;

      var movieDetails = this.bookingService.getDetails()
      this.theatreMappings =  _.filter(this.theatreMappings, function(mapping){ return mapping.movie = movieDetails.name})
      console.log(this.theatreMappings);

      for( var mapping of this.theatreMappings){
        // console.log("ewfew");
        // console.log(mapping.dates.length);
        for( var i=0; i<mapping.dates.length; i++){
          this.dates.push(mapping.dates[i]);
        }
      }
      // console.log(this.dates);
      this.dates = _.uniq(this.dates);
      console.log(this.dates);
      // console.log(this.theatreMappings);
      this.socket.syncUpdates('theatremappings', this.theatreMappings);
    });
  }
}

angular.module('movieApp')
  .component('timings', {
    templateUrl: 'app/timings/timings.html',
    controller: TimingsComponent,
    controllerAs: 'timingsCtrl'
  });

})();
