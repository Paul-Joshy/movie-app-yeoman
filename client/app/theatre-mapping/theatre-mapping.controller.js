'use strict';

(function(){

class TheatreMappingComponent {
  constructor($http, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.movies = [];
    this.theatres = [];
    this.cities = [];
    this.mappings = [];
    // this.enableUpdate = false
  }

    $onInit(){

      this.$http.get('/api/theatres').then(response =>{
        this.theatres = response.data;
        // console.log(this.theatres);
        this.socket.syncUpdates('theatre', this.theatres);
      });

      this.$http.get('/api/movies').then(response =>{
        this.movies = response.data;
        // console.log(this.theatres);
        this.socket.syncUpdates('movie', this.theatres);
      });

      this.$http.get('/api/cities').then(response =>{
        this.cities = response.data;
        // console.log(this.theatres);
        this.socket.syncUpdates('city', this.theatres);
      });

      this.$http.get('/api/theatre-mappings').then(response =>{
        this.mappings = response.data;
        console.log(this.mappings);
        // this.socket.syncUpdates('m', this.theatres);
      });
    }

    save(){
      console.log(this.theatreForm);
      this.$http.post('api/theatre-mappings',{
        movie: this.theatreForm.movie,
        city: this.theatreForm.city,
        theatre: this.theatreForm.theatre,
        date: this.theatreForm.date
      });
      this.theatreForm = '';
    }

  }

angular.module('movieApp')
  .component('theatreMapping', {
    templateUrl: 'app/theatre-mapping/theatre-mapping.html',
    controller: TheatreMappingComponent,
    controllerAs: 'theatreMappingCtrl'
  });


})();
