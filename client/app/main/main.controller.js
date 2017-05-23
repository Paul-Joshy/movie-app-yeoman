'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, booking, $location) {
      this.$http = $http;
      this.socket = socket;
      // this.movies = [];
      // this.mappings = [];
      this.bookingService = booking;
      this.$location = $location;
      this.filteredMovies = [];
      // this.movieNames = undefined;
      // this.cities = undefined;
      this.query = {};
      // this.query.city = undefined;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('movies');
      });
    }

    $onInit() {
      this.$http.get('/api/theatre-mappings/').then( response =>{
        this.mappings = response.data;
        console.log(this.mappings);

        this.movieNames = [];
        this.cities = [];

        for(var mapping of this.mappings){
          // console.log(mapping);
          this.movieNames.push(mapping.movie);
          this.cities.push(mapping.city);
        }
        this.movieNames =_.uniq(this.movieNames);
        this.cities =_.uniq(this.cities);
        console.log(this.movieNames);
        console.log(this.cities);
        this.$http.get('/api/movies').then( response =>{
          this.movies = response.data;
          console.log(this.movies)
          this.movies = _.filter(this.movies, (movie)=>{ return _.find(this.movieNames, (title)=>{ return title === movie.Title }) } )
          console.log(this.movies)
        })

        $('#ratings').rateYo({
          rating: 3.6
        });
      });


    }

    filterMovies(city){

      $('html, body').animate({
        scrollTop: $("#searchbar").offset().top
    }, 1000);

      console.log('this.movies');
      console.log(this.mappings)
      this.query.city = city;
      this.filteredMovies = _.filter(this.movies, (movie)=>{ return _.contains( _.pluck( _.filter(this.mappings, (mapping)=>{ return mapping.city === this.query.city } ), 'movie' ), movie.Title ) } );
      console.log(this.filteredMovies);
    }

    selectMovie(name){
      console.log(this.bookingService.setName);
      this.bookingService.setName(name);
      this.$location.path('/timings');
    }
  }

  angular.module('movieApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
