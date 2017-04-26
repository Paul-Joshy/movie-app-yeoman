'use strict';

(function(){

class MoviesComponent {
  constructor($http, $scope, socket) {
    // this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.movieData = [];
  }

  $onInit() {
    this.$http.get('/api/movies')
    .then(response => {
      this.movies = response.data;
      console.log(this.movies);
      this.socket.syncUpdates('movie', this.movies);
    });
  }

  searchMovies(){
    // console.log('hi');
    this.$http.get('http://www.omdbapi.com/?t='+this.search.title)
      .then(response => {
        this.movieData = response.data;
        console.log(this.movieData);
        this.socket.syncUpdates('movie', this.movieData);
      });
  }

  addMovie() {
      this.$http.post('/api/movies', {
        Title: this.movieData.Title,
        Year: this.movieData.Year,
        Genre: this.movieData.Genre,
        Plot: this.movieData.Plot,
        Actors: this.movieData.Actors,
        Director: this.movieData.Director,
        Runtime: this.movieData.Runtime
      });
      this.newMovie = '';

      // this.$http.get('/api/movies').then(response => {
      //   this.movies = response.data;
      //   console.log(this.movies);
      //   // this.socket.syncUpdates('thing', this.awesomeThings);
      // });
  }

  deleteMovie(movie) {
    // console.log('Work Bitch');
    this.$http.delete('/api/movies/' + movie._id).then(response => {
      console.log(response);
    });

    // this.$http.get('/api/movies')
    // .then(response => {
    //   this.movies = response.data;
    //   console.log(this.movies);
    //   // this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }
}

angular.module('movieApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
