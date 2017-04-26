'use strict';

(function(){

class TheatresComponent {
  constructor($http, socket) {
    // this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.theatres = [];
    this.enableUpdate = false
  }

  $onInit(){
    this.$http.get('/api/theatres').then(response =>{
      this.theatres = response.data;
      console.log(this.theatres);
      this.socket.syncUpdates('theatre', this.theatres);
    });
  }

  getTheatres(theatre){
    // console.log('sdfd');
    this.enableUpdate = false;
    this.$http.get('/api/theatres/').then(response =>{
      this.theatres = response.data;
      console.log(this.theatres);
      // this.socket.syncUpdates('theatre', this.theatres);
    });
  }

  addTheatre(){
    this.$http.post('api/theatres',{
      name: this.theatre.name,
      location: this.theatre.location,
      screenCount: this.theatre.screenCount,
      seatCount: this.theatre.seatCount
    });
    this.theatre = '';
  }

  deleteTheatre(theatre){
    console.log(theatre);
    this.$http.delete('api/theatres/' + theatre._id).then(response => {
      console.log(response);
    });
  }

  saveTheatre(theatre){
    this.$http.put('api/theatres/' + theatre._id, {
      name: theatre.name,
      location: theatre.location,
      screenCount: theatre.screenCount,
      seatCount: theatre.seatCount
    }).then(response => {
      console.log(response);
    })
  }
}



angular.module('movieApp')
  .component('theatres', {
    templateUrl: 'app/theatres/theatres.html',
    controller: TheatresComponent,
    controllerAs: 'theatresCtrl'
  });

})();
